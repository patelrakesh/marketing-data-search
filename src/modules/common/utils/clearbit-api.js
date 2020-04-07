/* eslint-disable linebreak-style */
/* eslint-disable max-depth */
/* eslint-disable linebreak-style */
import axios from 'axios'
import clearbitAPI from 'clearbit'

let Client = clearbitAPI.Client;
let clearbit;

import BusinessEnrichment from '../models/company'
const CLEARBIT_API_BASE_URL = 'https://company.clearbit.com/v1/domains/find';

export default {

    lookupCompany: async (domain, tld, companyName) => {

        let company = await BusinessEnrichment.findOne({ name: companyName }).exec();

        if (company && company.notFound) {
          return null
        }

        company = await BusinessEnrichment.findOne({ domain: `${domain}.${tld}` }).exec();


        if (!company) {

          company = await BusinessEnrichment.findOne({ roldomainAliasese: `${domain}.${tld}` }).exec();
          if (!company) {

            let queryParams = "?";
            queryParams += "name=" + companyName

            let nameToDomain;
            let name;
            let companyLegal;

            try {
               nameToDomain = await axios.get(CLEARBIT_API_BASE_URL + queryParams, { headers: { Authorization: 'Bearer ' + process.env.CLEARBIT_API_KEY } })
               company = nameToDomain ? await BusinessEnrichment.findOne({ domain: nameToDomain.data.domain }).exec() : nameToDomain
               
            } catch (error) {
              console.error("Domain not found")
            }

            if (!company) {
              
                if (companyName) {
                  name = await BusinessEnrichment.findOne({ name: companyName }).exec();
                }
                
                // eslint-disable-next-line no-negated-condition
                if (!name) {
                    if (companyName) {
                      companyLegal = await BusinessEnrichment.findOne({ legalName: companyName }).exec();
                    }
                    
                    // eslint-disable-next-line no-negated-condition
                    if (!companyLegal) {

                      company = await BusinessEnrichment.findOne({ "site.emailAddresses": {$regex: `${domain}.${tld}$`, $options: "m"} }).exec();
                      
                      // eslint-disable-next-line no-negated-condition
                      if (!company) {
                        
                        try {
                          company = await clearbit.Company.find({domain: `${domain}.${tld}`})
                          
                          let newBusiness = new BusinessEnrichment(company);
                          newBusiness.save()
                        } catch (error) {
                          
                          console.error(error);

                          try {
                            company = await clearbit.Company.find({domain: nameToDomain ? nameToDomain.data.domain : null})
                           
                            let newBusiness = new BusinessEnrichment(company);
                            newBusiness.save()

                          } catch (error2) {
                            console.error(error2);

                            let newBusiness = new BusinessEnrichment({name: companyName, notFound: true});
                            newBusiness.save()
                          }
                        }
                                               
                      } else {
                        return company;
                      }

                    } else {
                      return companyLegal;
                    }
                } else {
                  return name;
                }

            }
          }
        }

        return company
    },

    connectApi: () => {
      clearbit = new Client({key: process.env.CLEARBIT_API_KEY})
    }
  }