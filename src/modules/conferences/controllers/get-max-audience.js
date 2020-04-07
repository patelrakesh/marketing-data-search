/* eslint-disable linebreak-style */
import Conference from '../models/conference'

export default async () => {
  return await Conference.aggregate([
    {$group: {_id: null, max: {$max: "$estAudience" }}}
    ]).exec()
}