import mongoose from 'mongoose'
const Schema = mongoose.Schema

export default mongoose.model('mediaOutlet', new Schema({
  companyName: { type: String, required: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  position: { type: String, required: false },
  phone: { type: String, required: false },
  email: { type: String, required: false },
  magazineGenre: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },

  // Type can only be magazine, newspaper, radio or tvstation
  mediaType: { type: String, required: true },
}, { collection: "mediaOutlets" }))