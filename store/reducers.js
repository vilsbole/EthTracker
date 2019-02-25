import { combineReducers } from 'redux'
import { DETAILS } from './constants'

function data(
  state = {
    values: [],
    accounts: {},
    openedList: null
  },
  action
) {
  switch (action.type) {
    case 'INPUT':
      return {
        ...state,
        values: [ ...state.values, action.payload ]
      }
    case DETAILS.START: {
      const { account } = action.payload
      return {
        ...state,
        accounts: {
          ...state.accounts,
          [account]: { isLoading: true }
        }
      }
    }
    case DETAILS.COMPLETE: {
      const { account, txs, ops, summary } = action.payload
      const accountData = {
        lastFetch: new Date(),
        isLoading: false,
        txs,
        ops,
        summary,
      }
      return {
        ...state,
        accounts: {
          ...state.accounts,
          [account]: accountData
        }
      }
    }
    case DETAILS.ERROR: {
      const { account, err } = action.payload
      const accountData = {
        lastFetch: new Date(),
        isLoading: false,
        err
      }
      return {
        ...state,
        accounts: {
          ...state.accounts,
          [account]: accountData
        }
      }
    }
    case DETAILS.OPEN_LIST: {
      return {
        ...state,
        openedList: action.payload.listName
      }
    }
    case DETAILS.CLOSE_LIST: {
      return {
        ...state,
        openedList: null
      }
    }
    default:
      return state
  }
}

export default combineReducers({ data })
