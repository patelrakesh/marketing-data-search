import { EventOrganization } from '../models/event-organization'

export default async (ctx) => {
  return await EventOrganization.updateOne({ _id: ctx.params.id }, ctx.body)
}