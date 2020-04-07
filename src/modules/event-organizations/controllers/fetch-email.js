import { EventOrganization } from '../models/event-organization'

export default async (ctx) => {
  return await EventOrganization.findById(ctx.params.id).select('email').exec()
}