/* eslint-disable linebreak-style */
import MediaOutlet from '../models/media-outlet'
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
    let searchResults = await MediaOutlet.find(queryObj).select(paramsConfig.propertiesSelection).lean().limit(resultsPerPage).skip(offset).exec()
    let total = await MediaOutlet.countDocuments(queryObj).exec()

    for (let result of searchResults) {

      let domain;
      let tld;

      if (result.email) {
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

      result.enrichment = await clearBitEnrichment.lookupCompany(domain, tld, result.companyName)
      
      if (result.enrichment) {
        if (result.enrichment.name && result.enrichment.domain) { 
          await MediaOutlet.findOneAndUpdate(
            // eslint-disable-next-line no-underscore-dangle
            { _id: result._id}, 
            {
              companyName: result.enrichment.name, 
              website: result.enrichment.domain
            }
          ) 
        } else if (result.enrichment.name) {
            await MediaOutlet.findOneAndUpdate(
              // eslint-disable-next-line no-underscore-dangle
              { _id: result._id}, 
              {companyName: result.enrichment.name}
            )
          } else if (result.enrichment.domain) {
            await MediaOutlet.findOneAndUpdate(
              // eslint-disable-next-line no-underscore-dangle
              { _id: result._id}, 
              {website: result.enrichment.domain}
            )
          }
       }

      if (result.email) {
        result.hasEmail = true
        delete result.email
      }
      if (result.firstName) {
        result.person = true
        delete result.firstName
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

const initParams = () => {
  return {
    propertiesSelection: constants.RESULTS_SELECTION,
    paramExclusions: constants.PARAM_EXCLUSIONS,
    paramText: constants.PARAM_TEXT
  }
}