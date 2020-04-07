import LocalBusiness from '../models/local-business'
import constants from '../constants'

export default async ctx => {
  const excludedFields = constants.LOCAL_DETAIL_SELECTION
  return await LocalBusiness.findById(ctx.params.id).select(excludedFields).exec()
}