export default {
  LOCAL_RESULTS_SELECTION: 'companyName city state description email address website companyName',
  LOCAL_PARAM_EXCLUSIONS: ["offset", "limit", "country"],
  LOCAL_PARAM_TEXT: ["keywords"],

  NATIONAL_RESULTS_SELECTION: 'city state email organization position role specificIndustry firstName middleName lastName website organization',
  NATIONAL_PARAM_EXCLUSIONS: ["offset", "limit", "country"],
  NATIONAL_PARAM_TEXT: ["keywords", "position", "industry"],

  LOCAL_CONTACT_PROPERTIES: 'email address companyAddress webAddress website phoneNumber phone zipcode',
  NATIONAL_CONTACT_PROPERTIES: 'email phone phone1 address address1 zipCode website',

  BUSINESS_DESCRIPTION_LIMIT: 200,

  DOMAIN_EXCLUSIONS: ["hotmail", "gmail", "yahoo", "outlook", "me", "aol"],
}