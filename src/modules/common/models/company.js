/* eslint-disable linebreak-style */
import mongoose from 'mongoose'
const Schema = mongoose.Schema


export default mongoose.model('companiesEnrichment', new Schema({
  id: { type: String, required: false },
  name: { type: String, required: false },
  legalName: { type: String, required: false },
  domain: { type: String, required: false },
  roldomainAliasese: { type: [String], required: false },
  site: {type: {phoneNumbers:[String], emailAddresses:[String]}},
  category: {type: {sector: String, industryGroup: String, industry: String, subIndustry: String, sicCode: String, naicsCode: String}},
  tags: {type: [String]},
  description: { type: String, required: false },
  foundedYear: { type: Number, required: false },
  location: { type: String, required: false },
  timeZone: { type: String, required: false },
  utcOffset: { type: Number, required: false },
  geo: {type: {streetNumber: String, streetName: String, subPremise: String, city: String, postalCode: String, state: String, stateCode: String, country: String, countryCode: String, lat: Number, lng: Number}},
  logo: { type: String, required: false },
  facebook: {type: {handle: String}},
  linkedin: {type: {handle: String}},
  twitter: {type: {handle: String, id: String, bio: String, followers: Number, following: Number, location: String, site: String, avatar: String}},
  crunchbase: {type: {handle: String}},
  emailProvider: {type: Boolean},
  type: {type: String},
  identifiers: {type: {usEIN: String}},
  phone: {type: String},
  indexedAt: {type: Date},
  metrics: {type: {alexaUsRank: Number, alexaGlobalRank: Number, employees: Number, employeesRange: Number, marketCap: Number, raised: Number, annualRevenue: Number, estimatedAnnualRevenue: String, fiscalYearEnd: Number}},
  tech: {type: [String]},
  parent: {type: {domain: String}},
  ultimate_parent: {type: {domain: String}},
  notFound: {type: Boolean, required: false}
}, { collection: "companiesEnrichment" }))