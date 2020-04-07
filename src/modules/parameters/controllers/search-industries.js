import Industry from '../models/industry'
import constants from '../constants'

export default async ctx => {
  return await Industry.find({ industry: { $regex: ctx.query.q, $options: 'i' } }).limit(constants.INDUSTRIES_RESULTS_LIMIT).exec()
}