
export function setValue(value) {
  return async (dispatch) => {
    dispatch({
      type: 'INPUT',
      payload: value
    })
  }
}
