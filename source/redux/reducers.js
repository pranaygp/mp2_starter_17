export function search(state={ query: "", isLoading: false }, action) {
  switch (action.type) {
    case 'SEARCH':
      return {
        ...state,
        query: action.query,
        isLoading: true
      }
    case 'RESULTS':
      return {
        ...state,
        isLoading: false
      }
    default: 
      return state;
  }
}

export function spotify(state = {connected: false, access_token: null, token_type: null}, action) {
  switch (action.type) {
    case 'AUTH':
      return {
        ...state,
        connected: true,
        access_token: action.access_token,
        token_type: action.token_type
      }
    default:
      return state;
  }
}

export function data(state = { results: [] }, action) {
  switch (action.type) {
    case 'RESULTS':
      return {
        ...state,
        results: action.results.sort((a, b) => a.name.localeCompare(b.name))
      }
    default:
      return state
  }
}

export function sort(state = { name:'ASC', artist:null, popularity: null }, action) {
  switch (action.type) {
    case 'SORT':
      if (state[action.key] === null || state[action.key] === 'DESC') {
        return {
          name: null,
          artist: null,
          popularity: null,
          [action.key]: 'ASC'
        }
      }
      if (state[action.key] === 'ASC') {
        return {
          name: null,
          artist: null,
          popularity: null,
          [action.key]: 'DESC'
        }
      }
    default:
      return state
  }
}

export function filters(state = { singleArtist: false, noExplicit: false }, action) {
  switch (action.type) {
    case 'FILTER':
      return {
        ...state,
        [action.key]: !state[action.key]
      }
    default:
      return state
  }
}

export function sourcePage (state = 'LIST', action) {
  switch (action.type) {
    case 'SOURCE':
      return action.source
    default: 
      return state
  }
}
