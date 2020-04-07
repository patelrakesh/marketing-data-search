import { EventOrganization } from '../models/event-organization'

export default async (ctx) => {
  const excludedFields = '-_id -email -year -dataFileType -sourceFileType '
  return await EventOrganization.findById(ctx.params.id).select(excludedFields).exec()
}