import mongoose from 'mongoose'
const Schema = mongoose.Schema

let businessDescriptionSchema = new Schema({

  label: { type: String, required: true },
  valueLower: { type: String, required: true, unique: true },
  uses: { type: Number, required: false, default: 0 }

})

export default mongoose.model('businessDescription', businessDescriptionSchema, 'businessDescriptions')