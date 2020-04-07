import LocalBusiness from '../models/local-business'
import NationalBusiness from '../models/national-business'

export default async ctx => {
  const Model = ctx.params.type === 'local' ? LocalBusiness : NationalBusiness
  return await Model.findById(ctx.params.id).select('email').exec()
}