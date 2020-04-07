import mongoose from 'mongoose'
const Schema = mongoose.Schema

export default mongoose.model('industry',
    new Schema({
        industry: { type: String, required: true }
    })
    , 'industries')