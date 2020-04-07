import JobTitle from '../models/job-title'
import constants from '../constants'

export default async ctx => {
  return await JobTitle.find({ lang: 'en', title: { $regex: ctx.query.q, $options: 'i' } }).select('title').limit(constants.JOB_TITLES_LIMIT).exec()
}