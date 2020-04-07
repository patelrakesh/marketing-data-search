/* eslint-disable linebreak-style */
import Conference from '../models/conference'

export default async () => {
  return await Conference.aggregate([
    {$group: {_id: "$category", category: { $first: "$category" }}},
    {$sort: {category: 1}}
  ]).exec()
}