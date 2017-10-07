export function search(query) {
  return {
    type: 'SEARCH',
    query
  }
}

export function results(results) {
  return {
    type: 'RESULTS',
    results
  }
}

export function auth(data) {
  return {
    type: 'AUTH',
    ...data
  }
}