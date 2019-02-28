import { combineReducers } from 'redux'
import { DETAILS, MARKET, SEARCH } from './constants'

function data(
  state = {
    history: [],
    accounts: {},
    expandedList: null,
    isUpdating: false,
    meta: {},
    quotes: []
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
        // meta,
        // quotes,
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
      return { ...state, expandedList: action.payload.listName }
    }
    case DETAILS.CLOSE_LIST: {
      return { ...state, expandedList: null }
    }
    case DETAILS.UPDATE_START: {
      return { ...state, isUpdating: true }
    }
    case DETAILS.UPDATE_COMPLETE: {
      return { ...state, isUpdating: false }
    }
    case MARKET.REQUEST: {
      return { ...state } // do nothing for the moment
    }
    case MARKET.SUCCESS: {
      const { meta, quotes } = action.payload
      return { ...state, meta, quotes }
    }
    case MARKET.FAILURE: {
      return { ...state }
    }
    default:
      return state
  }
}

export default combineReducers({ data })
