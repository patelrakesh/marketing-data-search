import mongoose from 'mongoose'
const Schema = mongoose.Schema

/*
Data file types:
TYPE_NATIONAL_BUSINESS = 4

Source file types:
FILE_IEG_SPONSORS = 3
FILE_CORP = 4
*/

export default mongoose.model('nationalBusiness', new Schema({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  organization: { type: String, required: false },
  position: { type: String, required: false },
  role: { type: String, required: false },
  phone: { type: String, required: false },
  fax: { type: String, required: false },
  address1: { type: String, required: false, alias: 'address' },
  city: { type: String, required: false },
  state: { type: String, required: false },
  country: { type: String, required: false },
  website: { type: String, required: false },
  email: { type: String, required: false },
  specificIndustry: { type: String, required: false }
}, { collection: "nationalBusinesses" }))