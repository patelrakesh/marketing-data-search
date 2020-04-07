import mongoose from 'mongoose'
const Schema = mongoose.Schema

/*
Data file types:
TYPE_LOCAL_BUSINESS = 3

Source file types:
FILE_ALPHABET_EMAILS = 5
*/

export default mongoose.model('localBusiness', new Schema({
  /*
  "_id" : ObjectId("5bc4f9ecde2dda630398a4ae"),
  "companyName" : "St Patrick''s Church",
  "email" : "felixmaguire@yahoo.com",
  "address" : "2111 Muldoon Rd",
  "city" : "Anchorage",
  "state" : "AK",
  "zipcode" : "99504-3612",
  "phoneNumber" : NumberLong(9073375460),
  "faxNumber" : NumberLong(9073371538),
  "sicCode" : 866107,
  "sicDescription" : "Churches",
  "webAddress" : "www.st.patsak.org",
  "dataFileType" : 3,
  "sourceFileType" : 5,
  "year" : 2014,
  "inputFile" : "AK Email 2014.csv"
  */
  companyName: { type: String, required: false },
  email: { type: String, required: false },
  address: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },
  zipcode: { type: String, required: false },
  phoneNumber: { type: Number, required: false },
  faxNumber: { type: Number, required: false },
  sicCode: { type: Number, required: false },
  description: { type: String, required: false },
  descriptionId: { type: Schema.Types.ObjectId, ref: 'businessDescription', required: false },
  webAddress: { type: String, required: false },
  dataFileType: { type: Number, required: false },
  sourceFileType: { type: Number, required: false },
  year: { type: Number, required: false },
  inputFile: { type: String, required: false },
}, { collection: "localBusinesses" }))