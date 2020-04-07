export default {
  TYPE_PRINCIPAL: 1,
  TYPE_EVENT_PLANNER: 2,

  RESULTS_EXCLUSION_COMMON: '-firstName -lastName -zipCode -year',
  RESULTS_EXCLUSION_SCHOOL: '-principalName -address -phone -fax -zipCodePlus4',
  RESULTS_EXCLUSION_ORG: '-personPhone -personFax -address1 -address2 -organizationPhone -organizationWebsite -organizationFax',
  
  PARAM_EXCLUSIONS: ["offset", "limit", "country"],
  PARAM_TEXT: ["keywords"],

  CONTACT_PROPERTIES_COMMON: 'firstName lastName zipCode email',
  CONTACT_PROPERTIES_SCHOOL: 'principalName address phone fax zipCodePlus4',
  CONTACT_PROPERTIES_ORG: 'personPhone personFax address1 address2 organizationPhone organizationWebsite organizationFax',

  DOMAIN_EXCLUSIONS: ["hotmail", "gmail", "yahoo", "outlook", "me", "aol"],
}