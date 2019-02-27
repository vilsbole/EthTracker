import SECRET from '../.env'

const URL = 'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency'

// Coinmarketcap API only accepts uppercase symbols
const symbolsToString = symbols => symbols.map(s => s.toUpperCase()).join(',')

export const getMetaData = (symbols = []) => {

  const ENDPOINT = `${URL}/info?symbol=${symbolsToString(symbols)}`
  return fetch(ENDPOINT, {
    headers: { 'X-CMC_PRO_API_KEY': SECRET.API_KEY },
  })
  .then(res => res.json())
  .then(({ data }) => data)
}

export const getMarketQuote = (symbols = []) => {
  const ENDPOINT = `${URL}/quotes/latest?symbol=${symbolsToString(symbols)}&convert=EUR`
  return fetch(ENDPOINT, {
    headers: { 'X-CMC_PRO_API_KEY': SECRET.API_KEY },
  })
  .then(res => res.json())
  .then(({ data }) => data)
}
