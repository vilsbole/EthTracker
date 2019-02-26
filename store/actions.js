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

export function setAccountDetails(account) {
  return async (dispatch) => {
    dispatch({
      type: DETAILS.START,
      payload: { account }
    })
    try {
      const txs = await fetchTxs(account)
      const ops = txsToOperations(txs, account)
      const summary = getSummary(ops)
      const meta = await getMetaData(summary.map(t => t.symbol))
      const quotes = await getMarketQuote(summary.map(t => t.symbol))
      console.log(meta, quotes)
      dispatch({
        type: DETAILS.COMPLETE,
        payload: { ops, txs, account, summary, meta, quotes }
      })
    } catch (err) {
      throw new Error(err)
      dispatch({
        type: DETAILS.ERROR,
        payload: { account, err }
      })
    }
  }
}

export function toggleList(name) {
  return (dispatch, getState) => {
    const { openedList } = getState().data
    if (openedList === name) {
      dispatch({ type: DETAILS.CLOSE_LIST })
    } else {
      dispatch({ type: DETAILS.OPEN_LIST, payload: { listName: name }})
    }
  }
}
