import { DETAILS, SEARCH } from './constants'
import { fetchTxs, txsToOperations, getSummary } from '@api/ledgerUtils'

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
      dispatch({
        type: DETAILS.COMPLETE,
        payload: { ops, txs, account, summary }
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
