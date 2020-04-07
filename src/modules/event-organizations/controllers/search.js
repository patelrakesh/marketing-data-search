/* eslint-disable linebreak-style */
import { EventPlanner, Principal } from '../models/event-organization'
import files from '../../common/resources/parameters/files'
import constants from '../constants'
import mongooseQuery from '../../common/utils/mongoose-query'
import clearBitEnrichment from '../../common/utils/clearbit-api'

const DEFAULT_OFFSET = 0
const DEFAULT_RESULTS = 20

export default async (ctx) => {
  let parameters = {}
  Object.assign(parameters, ctx.query)

  // Store type of the search for building query later
  const typeSearch = parameters.typeSearch
  // Remove unnecessary properties
  delete parameters.typeSearch
  delete parameters.pagination

  let propertiesSelection = `${constants.RESULTS_EXCLUSION_COMMON} ${constants.RESULTS_EXCLUSION_ORG} ${constants.RESULTS_EXCLUSION_SCHOOL}`
  parseParameters(parameters)

  // Save and delete offset and limit before generating mongo query
  let offset = parameters.offset ? Number(parameters.offset) : DEFAULT_OFFSET
  delete parameters.offset
  let resultsPerPage = parameters.resultsPerPage ? Number(parameters.resultsPerPage) : DEFAULT_RESULTS
  delete parameters.resultsPerPage

  let queryBuildConfig = {
    parameters: parameters,
    paramText: constants.PARAM_TEXT,
    paramExclusions: constants.PARAM_EXCLUSIONS
  }
  let queryObj = mongooseQuery.buildObjectQuery(queryBuildConfig)

  let queryModel = getQueryModelByType(typeSearch)

  try {

    let searchResults = await queryModel.find(queryObj).select(propertiesSelection).lean().limit(resultsPerPage).skip(offset).exec()
    let total = await queryModel.countDocuments(queryObj).exec()

    for (let result of searchResults) {
      await buildArrays(result, typeSearch, queryModel)
    }

    return {
      results: searchResults,
      total: total,
      offset: offset + resultsPerPage
    }

  } catch (err) {
    ctx.app.emit('error', err, ctx)
  }
}

const parseParameters = (parameters) => {
  if (parameters.dataFileType === constants.TYPE_EVENT_PLANNER || !parameters.dataFileType) {
    if (parameters.month) {
      parameters[parameters.month] = { $ne: null }
      delete parameters.month
    }
    if (parameters.place) {
      parameters[parameters.place] = { $ne: null }
      delete parameters.place
    }
    if (parameters.location) {
      parameters[parameters.location] = { $ne: null }
      delete parameters.location
    }
    if (parameters.role) {
      parameters[parameters.role] = parameters.role
      delete parameters.role
    }
  }
  if (parameters.dataFileType === constants.TYPE_PRINCIPAL || !parameters.dataFileType) {
    if (parameters.schoolType) {
      parameters[parameters.schoolType] = 'Y'
      delete parameters.schoolType
    }
  }
}

const buildArrays = async (result, typeSearch, queryModel) => {

  let companyName;
  let domain;
  let tld;

  if (result.organizationWebsite) {

      if (result.organizationWebsite.startsWith("www")) {
        domain = result.organizationWebsite.split(".")[1]
        tld = result.organizationWebsite.split(".")[2]
      } else {
        domain = result.organizationWebsite.split(".")[0]
        tld = result.organizationWebsite.split(".")[1]
      }

      if (tld.includes("/")) {
        tld = tld.split("/")[0]
      }

      result.website = `${domain}.${tld}`

  } else if (result.email) {
    domain = result.email.split("@")[1].split(".")[0]
    tld = result.email.split("@")[1].split(".")[1]
   
    // eslint-disable-next-line no-negated-condition
    if (!constants.DOMAIN_EXCLUSIONS.includes(domain)) {
      result.website = `${domain}.${tld}`
    }
    else {
      domain = null;
    }
  }

  if (typeSearch === "planner") {
    companyName = result.organization
  } else {
    companyName = result.schoolName
  }  
  
  result.enrichment = await clearBitEnrichment.lookupCompany(domain, tld, companyName)

  if (result.enrichment && typeSearch === "planner") {
    updateEnrichment(result, queryModel, "planner")
  } else if (result.enrichment && typeSearch === "principal") {
    updateEnrichment(result, queryModel, "principal")
  }

  if (result.email) {
    result.hasEmail = true
    delete result.email
  }
  if (result.organizationWebsite) {
    delete result.organizationWebsite
  }

  if (result.dataFileType === constants.TYPE_EVENT_PLANNER) {
    await buildMonthsArray(result)
    await buildPlacesArray(result)
    await buildLocationsArray(result)
  }
  else if (result.dataFileType === constants.TYPE_PRINCIPAL) {
    await buildSchoolTypesArray(result)
  }
}

const buildMonthsArray = async result => {
  result.months = []
  for (const month of files.months()) {
    if (result[month.value]) result.months.push(month.label)
  }
}

const buildPlacesArray = async result => {
  result.places = []
  for (const place of files.places()) {
    if (result[place.value]) result.places.push(place.label)
  }
}

const buildLocationsArray = async result => {
  result.locations = []
  for (const location of files.locations()) {
    if (result[location.value]) result.locations.push(location.label)
  }
}

const buildSchoolTypesArray = async result => {
  result.schoolTypes = []
  for (const schoolType of files.schoolTypes()) {
    if (result[schoolType.value] === 'Y') result.schoolTypes.push(schoolType.label)
  }
}

const getQueryModelByType = (type) => {
  switch (type) {
    case 'principal':
      return Principal
    default:
      return EventPlanner
  }
}

const updateEnrichment = async (result, model, type) => {
  if (result.enrichment.name && result.enrichment.domain) {
    if (type === 'planner') {
      await model.findOneAndUpdate(
        // eslint-disable-next-line no-underscore-dangle
        { _id: result._id}, 
        {
          organization: result.enrichment.name, 
          website: result.enrichment.domain
        }
      )
    } else if (type === 'principal') {
      await model.findOneAndUpdate(
        // eslint-disable-next-line no-underscore-dangle
        { _id: result._id}, 
        {
          schoolName: result.enrichment.name, 
          website: result.enrichment.domain
        }
      )
    }
  } else if (result.enrichment.name) {
    if (type === 'planner') {
      await model.findOneAndUpdate(
        // eslint-disable-next-line no-underscore-dangle
        { _id: result._id}, 
        {organization: result.enrichment.name}
      )
    } else if (type === 'principal') {
      await model.findOneAndUpdate(
        // eslint-disable-next-line no-underscore-dangle
        { _id: result._id}, 
        {schoolName: result.enrichment.name}
      )
    }
  } else if (result.enrichment.domain) {
    await model.findOneAndUpdate(
      // eslint-disable-next-line no-underscore-dangle
      { _id: result._id}, 
      {website: result.enrichment.domain}
    )
  }
}