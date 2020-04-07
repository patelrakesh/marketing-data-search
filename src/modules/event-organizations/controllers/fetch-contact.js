import { EventOrganization } from '../models/event-organization'
import constants from '../constants'

export default async (ctx) => {
  const {CONTACT_PROPERTIES_COMMON, CONTACT_PROPERTIES_ORG, CONTACT_PROPERTIES_SCHOOL} = constants
  return await EventOrganization.findById(ctx.params.id)
    .select(`${CONTACT_PROPERTIES_COMMON} ${CONTACT_PROPERTIES_ORG} ${CONTACT_PROPERTIES_SCHOOL}`).exec()
}