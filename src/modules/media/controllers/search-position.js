import MediaOutletPosition from '../models/media-outlet-position'

export default async ctx => {
  return await MediaOutletPosition.find({ mediaType: ctx.query.mediaType }).sort({ position: 1 }).exec()
}