/* eslint-disable linebreak-style */
import mongoose from 'mongoose'
const Schema = mongoose.Schema

let conference = new Schema({
  category: { type: String, required: true },
  eventName: { type: String, required: false },
  estAudience: { type: Number, required: false },
  location: { type: String, required: false },
  date: { type: Date, required: false },
  contactName: { type: String, required: false },
  email: { type: String, required: false },
  eventDescription: { type: String, required: false },
  year: { type: Number, required: false },
  city: { type: String, required: true },
  state: { type: String, required: true }, 
  website: { type: String, required: true }
}, { collection: "conferences" })

conference.index({ eventName: "text", eventDescription: "text" })

export default mongoose.model('conference', conference)