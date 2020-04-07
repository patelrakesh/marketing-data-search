import LocalBusiness from '../models/local-business'
import NationalBusiness from '../models/national-business'
import constants from '../constants'

export default async ctx => {
  const { LOCAL_CONTACT_PROPERTIES, NATIONAL_CONTACT_PROPERTIES } = constants

  const Model = ctx.params.type === 'local' ? LocalBusiness : NationalBusiness
  return await Model.findById(ctx.params.id).select(ctx.params.type === 'local' ? LOCAL_CONTACT_PROPERTIES : NATIONAL_CONTACT_PROPERTIES).exec()
}