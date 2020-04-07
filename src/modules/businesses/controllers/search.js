/* eslint-disable linebreak-style */
import UniqueLocalBusiness from '../models/unique-local-business'
import NationalBusiness from '../models/national-business'
import mongooseQuery from '../../common/utils/mongoose-query'

import clearBitEnrichment from '../../common/utils/clearbit-api'

import constants from '../constants'

export default async ctx => {
  let parameters = {}
  Object.assign(parameters, ctx.query)
  
  
  // Remove unnecessary properties
  delete parameters.pagination

  let paramsConfig = initParams(ctx.params.type)
  paramsConfig.parameters = parameters

  // Save and delete offset and limit before generating mongo query
  let offset = parameters.offset ? Number(parameters.offset) : 0
  delete parameters.offset
  let resultsPerPage = parameters.resultsPerPage ? Number(parameters.resultsPerPage) : 20
  delete parameters.resultsPerPage
  
  let queryObj = mongooseQuery.buildObjectQuery(paramsConfig)

  try {
    let searchResults = await paramsConfig.Model.find(queryObj).select(paramsConfig.propertiesSelection).lean().limit(resultsPerPage).skip(offset).exec()
    let total = await paramsConfig.Model.countDocuments(queryObj).exec()

    for (let result of searchResults) {

      let companyName;
      let domain;
      let tld;

      if (result.website) {
        if (result.website.startsWith("www")) {
          domain = result.website.split(".")[1]
          tld = result.website.split(".")[2]
          
        } else {
          domain = result.website.split(".")[0]
          tld = result.website.split(".")[1]
        }

        if (tld.includes("/")) {
          tld = tld.split("/")[0]
        }

        result.website = `${domain}.${tld}`
      }
      
      if (ctx.params.type === 'local') {
        companyName = result.companyName
      } else {
        companyName = result.organization
      }            

      result.enrichment = await clearBitEnrichment.lookupCompany(domain, tld, companyName)
     
      if (result.enrichment && paramsConfig === 'local') {
        updateEnrichment(result, paramsConfig.Model, 'local')
      } else if (result.enrichment && paramsConfig === 'national') {
        updateEnrichment(result, paramsConfig.Model, 'national')
      }

      if (result.email) {
        result.hasEmail = true
        delete result.email
      }
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

const initParams = type => {

  let paramsConfig
  if (type === 'local') {
    paramsConfig = {
      Model: UniqueLocalBusiness,
      propertiesSelection: constants.LOCAL_RESULTS_SELECTION,
      paramExclusions: constants.LOCAL_PARAM_EXCLUSIONS,
      paramText: constants.LOCAL_PARAM_TEXT
    }
  }
  else {
    paramsConfig = {
      Model: NationalBusiness,
      propertiesSelection: constants.NATIONAL_RESULTS_SELECTION,
      paramExclusions: constants.NATIONAL_PARAM_EXCLUSIONS,
      paramText: constants.NATIONAL_PARAM_TEXT
    }
  }
  return paramsConfig
}

const updateEnrichment = async (result, model, type) => {
  if (result.enrichment.name && result.enrichment.domain) {
    if (type === 'local') {
      await model.findOneAndUpdate(
        // eslint-disable-next-line no-underscore-dangle
        { _id: result._id}, 
        {
          companyName: result.enrichment.name, 
          website: result.enrichment.domain
        }
      )
    } else if (type === 'national') {
      await model.findOneAndUpdate(
        // eslint-disable-next-line no-underscore-dangle
        { _id: result._id}, 
        {
          organization: result.enrichment.name, 
          website: result.enrichment.domain
        }
      )
    }
  } else if (result.enrichment.name) {
    if (type === 'local') {
      await model.findOneAndUpdate(
        // eslint-disable-next-line no-underscore-dangle
        { _id: result._id}, 
        {companyName: result.enrichment.name}
      )
    } else if (type === 'national') {
      await model.findOneAndUpdate(
        // eslint-disable-next-line no-underscore-dangle
        { _id: result._id}, 
        {organization: result.enrichment.name}
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