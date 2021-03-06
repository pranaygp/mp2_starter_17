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

export function append_results(results) {
  return {
    type: 'APPEND_RESULTS',
    results
  }
}

export function auth(data) {
  return {
    type: 'AUTH',
    ...data
  }
}

export function sort(key) {
  return {
    type: 'SORT',
    key
  }
}

export function filter(key) {
  return {
    type: 'FILTER',
    key
  }
}

export function source(source) {
  return {
    type: 'SOURCE',
    source
  }
}