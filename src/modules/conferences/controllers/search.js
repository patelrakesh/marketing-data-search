/* eslint-disable linebreak-style */
import Conference from '../models/conference'
import mongooseQuery from '../../common/utils/mongoose-query'

import constants from '../constants'

export default async ctx => {

  let parameters = {}
  Object.assign(parameters, ctx.query)
  // Remove unnecessary properties
  delete parameters.pagination

  excludeNotNeededParameters(parameters)

  let paramsConfig = initParams(ctx.params.type)
  paramsConfig.parameters = parameters

  // Save and delete offset and limit before generating mongo query
  let offset = parameters.offset ? Number(parameters.offset) : 0
  delete parameters.offset
  let resultsPerPage = parameters.resultsPerPage ? Number(parameters.resultsPerPage) : 20
  delete parameters.resultsPerPage

  let queryObj = mongooseQuery.buildObjectQuery(paramsConfig)
  
  handleAudienceQuery(queryObj, ctx)
  handleDateQuery(queryObj, ctx)

  try {
    let searchResults = await Conference.find(queryObj).select(paramsConfig.propertiesSelection).lean().limit(resultsPerPage).skip(offset).exec()
    let total = await Conference.countDocuments(queryObj).exec()

    for (let result of searchResults) {
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

const initParams = () => {
  return {
    propertiesSelection: constants.RESULTS_SELECTION,
    paramExclusions: constants.PARAM_EXCLUSIONS,
    paramText: constants.PARAM_TEXT
  }
}

const excludeNotNeededParameters = parameters => {
  if (parameters.estAudienceMin) delete parameters.estAudienceMin
  
  if (parameters.estAudienceMax) delete parameters.estAudienceMax

  if (parameters.dateAfter) delete parameters.dateAfter
  
  if (parameters.dateBefore) delete parameters.dateBefore
  
  if (parameters.noUnknownAudience) delete parameters.noUnknownAudience
}

const handleAudienceQuery = (queryObj, ctx) => {
  if (ctx.query.noUnknownAudience) {
    if (ctx.query.estAudienceMin && ctx.query.estAudienceMax) {
      if (!queryObj.$and) { 
        queryObj.$and = [] 
      }
      queryObj.$and.push({ estAudience: {$gte: Number(ctx.query.estAudienceMin)} }) 
      queryObj.$and.push({ estAudience: {$lte: Number(ctx.query.estAudienceMax)} })
    } 
    else if (ctx.query.estAudienceMin) {
      queryObj.estAudience = {$gte: Number(ctx.query.estAudienceMin)}
    }
    else if (ctx.query.estAudienceMax) {
      if (!queryObj.$and) {
        queryObj.$and = []
      }
      queryObj.$and.push({ estAudience: { $ne: constants.UNKNOWN_EST_AUDIENCE } })
      queryObj.$and.push({ estAudience: { $lte: Number(ctx.query.estAudienceMax) } })
    }
    else {
      queryObj.estAudience = {$ne: constants.UNKNOWN_EST_AUDIENCE}
    }
  } else if (!ctx.query.noUnknownAudience) {
    if (ctx.query.estAudienceMin && ctx.query.estAudienceMax) {
      queryObj.$or = []
      queryObj.$or.push({ estAudience: {$eq: constants.UNKNOWN_EST_AUDIENCE}}) 
      
      queryObj.$or.push({$and: [{ estAudience: {$gte: Number(ctx.query.estAudienceMin)} }, { estAudience: {$lte: Number(ctx.query.estAudienceMax)} }]}) 
      
    } 
    else if (ctx.query.estAudienceMin) {
      queryObj.$or = []
      queryObj.$or.push({ estAudience: {$eq: constants.UNKNOWN_EST_AUDIENCE}})
      queryObj.$or.push({ estAudience: {$gte: Number(ctx.query.estAudienceMin)}})
    }
    else if (ctx.query.estAudienceMax) {
      queryObj.estAudience = {$lte: Number(ctx.query.estAudienceMax)}
    }
  }
  
}

const handleDateQuery = (queryObj, ctx) => {
  if (ctx.query.dateAfter && ctx.query.dateBefore) {
    if (!queryObj.$and) { 
      queryObj.$and = [] 
    }
    queryObj.$and.push({ date: {$gte: new Date(ctx.query.dateAfter)} }) 
    queryObj.$and.push({ date: {$lte: new Date(ctx.query.dateBefore)} })
  }
  else if (ctx.query.dateAfter) {
    queryObj.date = {$gte: new Date(ctx.query.dateAfter)}
  }
  else if (ctx.query.dateBefore) {
    queryObj.date = {$lte: new Date(ctx.query.dateBefore)}
  }
}