import Position from '../models/position'
import constants from '../constants'

export default async ctx => {
  return await Position.find({ position: { $regex: ctx.query.q, $options: 'i' } }).limit(constants.POSITION_RESLTS_LIMIT).exec()
}