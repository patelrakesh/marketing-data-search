import NationalBusiness from '../models/national-business'
import constants from '../constants'

export default async ctx => {
  const excludedFields = constants.NATIONAL_DETAIL_SELECTION
  return await NationalBusiness.findById(ctx.params.id).select(excludedFields).exec()
}