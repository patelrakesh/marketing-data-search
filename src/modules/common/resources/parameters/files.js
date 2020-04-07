import locations from './locations.json'
import places from './places.json'
import months from './months.json'
import roles from './roles-at-organization.json'
import schoolTypes from './school-types.json'

export default {
  locations: () => locations,
  places: () => places,
  months: () => months,
  roles: () => roles,
  schoolTypes: () => schoolTypes
}