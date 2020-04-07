import mongoose from 'mongoose'
const Schema = mongoose.Schema

export default mongoose.model('mediaOutletGenre', new Schema({
  genre: { type: String, required: true },
  mediaType: { type: String, required: false }

}, { collection: "mediaOutletGenres" }))