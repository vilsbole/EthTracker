import { combineReducers } from 'redux'
import { DETAILS, SEARCH } from './constants'

function data(
  state = {
    history: [],
    accounts: {},
    openedList: null
  },
  action
) {
  switch (action.type) {
    case SEARCH.ADD: {
      return {
        ...state,
        // Unshift the most recent search
        history: [ action.payload, ...state.history ]
      }
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
      const { account, txs, ops, summary, meta, quotes } = action.payload
      const accountData = {
        lastFetch: new Date(),
        isLoading: false,
        txs,
        ops,
        summary,
      }
      return {
        ...state,
        meta,
        quotes,
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
