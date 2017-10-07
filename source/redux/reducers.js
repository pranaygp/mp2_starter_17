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