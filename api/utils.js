import BN from 'bignumber.js'

export const convert = (price, value, magnitude) => {
  const amount = (value / Math.pow(10, magnitude))
  return new BN(price * amount)
}
