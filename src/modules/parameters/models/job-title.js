import mongoose from 'mongoose'
const Schema = mongoose.Schema

let jobTitleSchema = new Schema({

    title: { type: String, required: true },
    lang: { type: String, required: false },
    langConfidence: { type: Number, required: false },
    related_1: { type: String, required: false },
    related_2: { type: String, required: false },
    related_3: { type: String, required: false },
    related_4: { type: String, required: false },
    related_5: { type: String, required: false },
    related_6: { type: String, required: false },
    related_7: { type: String, required: false },
    related_8: { type: String, required: false },
    related_9: { type: String, required: false },
    related_10: { type: String, required: false },
    uses: { type: Number, required: false, default: 0 }

})

export default mongoose.model('jobTitle', jobTitleSchema, 'jobTitles')