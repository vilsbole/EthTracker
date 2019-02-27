# EthTracker

A simple react-native app built with Expo.


| ![home](https://user-images.githubusercontent.com/2429708/53465187-20e0b180-3a4d-11e9-97f4-38c11b36a652.png) | ![account](https://user-images.githubusercontent.com/2429708/53465663-0ad3f080-3a4f-11e9-8113-e650bd5a2cd0.png) |
|--------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|

#### Mandatory
- [x] Input field for Ethereum address
- [x] Easy access to EthereumAccount screen
- [x] Display ETH and ERC20 balances
- [x] Display address operations with value and direction

#### Optional
- [x] Display operation date
- [x] Pull to refresh tokens and operations
- [x] QRCode reader to pre-fill input
- [x] Counter-values to balances and operations
- [ ] Sort tokens by their counter-values
- [ ] Coin distribution in Pie Chart
- [x] Fold and unfold lists
- [ ] Group the operations by day

#### Coffee
- [x] Display history of previous searches
- [x] Data persistence between sessions


## Development

This app depends on the Coinmarketcap api.
To run in development you will need to create a file named `.env.js` at the root that exports an object containing your API_KEY.

```
  const env = {
    API_KEY: <SECRET_API_KEY>
  }

  export default env
```
