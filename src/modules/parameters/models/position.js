import mongoose from 'mongoose'
const Schema = mongoose.Schema

export default mongoose.model('position',
    new Schema({
        position: { type: String, required: true }
    })
    , 'positions')