import mongoose from 'mongoose'
const Schema = mongoose.Schema

export default mongoose.model('mediaOutletPosition', new Schema({
  position: { type: String, required: true },
  mediaType: { type: String, required: false }

}, { collection: "mediaOutletPositions" }))