import { DETAILS, SEARCH } from './constants'
import { fetchTxs, txsToOperations, getSummary } from '@api/ledgerUtils'
import { getMetaData, getMarketQuote } from '@api/agent'

export function setSearchHistory(value) {
  return async (dispatch) => {
    dispatch({
      type: SEARCH.ADD,
      payload: { date: new Date(), value }
    })
  }
}

export function setAccountDetails(account, isUpdate = false) {
  return async (dispatch) => {
    if (!isUpdate) {
      dispatch({ type: DETAILS.START, payload: { account } })
    }
    let txs, ops, summary = []
    try {
      txs = await fetchTxs(account)
      ops = txsToOperations(txs, account)
      summary = getSummary(ops)
    } catch (err) {
      throw new Error(err)
      dispatch({
        type: DETAILS.ERROR,
        payload: { account, err }
      })
    } finally {
      const meta = await getMetaData(summary.map(t => t.symbol))
      const quotes = await getMarketQuote(summary.map(t => t.symbol))
      dispatch({
        type: DETAILS.COMPLETE,
        payload: { ops, txs, account, summary, meta, quotes }
      })
    }
  }
}

export function updateAccountDetails(account) {
  return async (dispatch) => {
    dispatch({ type: DETAILS.UPDATE_START })
    try {
      await setAccountDetails(account, true)(dispatch)
    } finally {
      dispatch({ type: DETAILS.UPDATE_COMPLETE })
    }
  }
}

export function toggleList(name) {
  return (dispatch, getState) => {
    const { expandedList } = getState().data
    if (expandedList === name) {
      dispatch({ type: DETAILS.CLOSE_LIST })
    } else {
      dispatch({ type: DETAILS.OPEN_LIST, payload: { listName: name }})
    }
  }
}
