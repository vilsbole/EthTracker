import { combineReducers } from 'redux'

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

function data(
  state = {
    values: []
  },
  action
) {
  switch (action.type) {
    case 'INPUT':
      return {
        ...state,
        values: [ ...state.values, action.payload ]
      }
    default:
      return state
  }
}

export default combineReducers({ counter, data })
