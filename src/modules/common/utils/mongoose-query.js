export default {
  buildObjectQuery: ({ parameters, paramText, paramExclusions }) => {
    let queryObj = { ...parameters }

    let textSearchQuery = ''

    for (const property of paramText) {
      if (parameters[property])
        textSearchQuery += parameters[property].replace(/,/u, " ")
    }

    if (textSearchQuery) {
      queryObj = { $and: [] }
      Object.keys(parameters).forEach(key => {
        if (!paramExclusions.includes(key) && !paramText.includes(key))
          queryObj.$and.push({ [key]: parameters[key] })
      })

      queryObj.$and.push({ $text: { $search: textSearchQuery } })
    }
    return queryObj
  }
}