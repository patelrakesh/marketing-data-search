import LocalBusiness from '../models/local-business'
import NationalBusiness from '../models/national-business'

export default async ctx => {
  const Model = ctx.params.type === 'local' ? LocalBusiness : NationalBusiness
  return await Model.updateOne({ _id: ctx.params.id }, ctx.body)
}