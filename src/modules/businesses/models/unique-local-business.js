import mongoose from 'mongoose'
const Schema = mongoose.Schema

export default mongoose.model('uniqueLocalBusiness', new Schema({
  companyName: { type: String, required: true },
  address: { type: String, required: false },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipcode: { type: String, required: false },
  description: { type: String, required: true },
  descriptionId: { type: Schema.Types.ObjectId, ref: 'businessDescription', required: false },
  phone: { type: String, required: false },
  webAddress: { type: String, required: false },
  email: { type: String, required: false }
}, { collection: "uniqueLocalBusinesses" }))