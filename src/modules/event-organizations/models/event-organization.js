import mongoose from 'mongoose'
const Schema = mongoose.Schema

/*
Data file types:
TYPE_PRINCIPAL = 1
TYPE_EVENT_PLANNER = 2

Source file types:
FILE_PRINCIPALS = 1
FILE_EVENT_MEETING = 2
*/

const baseOptions = {
  discriminatorKey: 'entryType',
  collection: 'eventOrganizations'
}
let EventOrganization = mongoose.model('eventOrganization', new Schema({
  year: { type: Number },
  dataFileType: { type: Number },
  sourceFileType: { type: Number },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  email: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },
  zipCode: { type: Number, required: false },
}, baseOptions))

let EventPlanner = EventOrganization.discriminator('Planner', new mongoose.Schema({
  /*
  "firstName" : "Andrea",
  "lastName" : "Abel",
  "position" : "Communications Director",
  "roleAtOrganization" : "Communications/Public Relations",
  "personPhone" : "512-329-5959",
  "personFax" : "512-329-9189",
  "organization" : "Texas Association of Community Health Centers",
  "acronym" : "TACHC",
  "budget" : 5179633,
  "f" : 7,
  "address1" : "5900 S.W. Pkwy.",
  "address2" : "Building Three",
  "city" : "Austin",
  "state" : "TX",
  "zipCode" : 78735,
  "country" : "United States",
  "organizationPhone" : "512-329-5959",
  "organizationFax" : "512-329-9189",
  "organizationWebsite" : "www.tachc.org",
  "organizationEMail" : "manager@tachc.org",
  "fewestMeetingsInAYear" : 1,
  "mostMeetingsInAYear" : 2,
  "shortestMeeting" : 2,
  "longestMeeting" : 5,
  "south" : 6,
  "westSouthCentral" : 6,
  "january" : 2,
  "february" : 1,
  "october" : 3,
  "resort" : 2,
  "golf" : 2,
  "convention" : 1,
  "airport" : 4,
  "dataFileType" : 2,
  "sourceFileType" : 2,
  "year" : 2015
  */
  position: { type: String, required: false },
  roleAtOrganization: { type: String, required: false },
  personPhone: { type: String, required: false },
  personFax: { type: String, required: false },
  organization: { type: String, required: false },
  acronym: { type: String, required: false },
  budget: { type: Number, required: false },
  f: { type: Number, required: false },
  address1: { type: String, required: false },
  address2: { type: String, required: false },
  country: { type: String, required: false },
  organizationPhone: { type: String, required: false },
  organizationFax: { type: String, required: false },
  organizationWebsite: { type: String, required: false },
  fewestMeetingsInAYear: { type: Number, required: false },
  mostMeetingsInAYear: { type: Number, required: false },
  shortestMeeting: { type: Number, required: false },
  longestMeeting: { type: Number, required: false },
  south: { type: Number, required: false },
  westSouthCentral: { type: Number, required: false },
  january: { type: Number, required: false },
  february: { type: Number, required: false },
  october: { type: Number, required: false },
  resort: { type: Number, required: false },
  golf: { type: Number, required: false },
  convention: { type: Number, required: false },
  airport: { type: Number, required: false }
}))

let Principal = EventOrganization.discriminator('Principal', new mongoose.Schema({
  /*
  "schoolName" : "Autauga County Alternative School",
  "principalName" : "Brock Dunn",
  "firstName" : "Brock",
  "lastName" : "Dunn",
  "emailAddress" : "brock.dunn@acboe.net",
  "address" : "153 W 4Th St",
  "city" : "Prattville",
  "state" : "AL",
  "zipCode" : 36067,
  "phone" : "(334) 361-3833",
  "fax" : "(334) 361-3834",
  "district" : "Autauga County School System",
  "zipCodePlus4" : "36067-3011",
  "county" : "Autauga County",
  "gradeLow" : 3,
  "gradeHigh" : 12,
  "elementarySchool" : "Y",
  "middleSchool" : "Y",
  "juniorHighSchool" : "Y",
  "highSchool" : "Y",
  "title1" : "Not Title 1",
  "ncesIdNumber" : 587,
  "dataFileType" : 1,
  "sourceFileType" : 1,
  "year" : 2015
  */
  schoolName: { type: String, required: false },
  principalName: { type: String, required: false },
  address: { type: String, required: false },
  phone: { type: String, required: false },
  fax: { type: String, required: false },
  district: { type: String, required: false },
  zipCodePlus4: { type: String, required: false },
  county: { type: String, required: false },
  gradeLow: { type: Number, required: false },
  gradeHigh: { type: Number, required: false },
  elementarySchool: { type: String, required: false },
  middleSchool: { type: String, required: false },
  juniorHighSchool: { type: String, required: false },
  highSchool: { type: String, required: false },
  title1: { type: String, required: false },
  ncesIdNumber: { type: Number, required: false }
}))

export {
  EventOrganization,
  Principal,
  EventPlanner
}