import MediaOutletGenre from '../models/media-outlet-genre'

export default async ctx => {
  return await MediaOutletGenre.find({ mediaType: ctx.query.mediaType }).sort({ genre: 1 }).exec()
}