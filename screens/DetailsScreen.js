import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
  import TimeAgo from 'react-timeago'

import { Text } from '@components'
import { setAccountDetails, toggleList } from '@store/actions'
import { getSummary, formatValue } from '@api/ledgerUtils'

class DetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params ? `${navigation.state.params.account}` : 'undefined',
    headerTitleStyle: { fontFamily: 'LektonBold' },
    headerBackTitleStyle: { fontFamily: 'Lekton' },
  })

  componentDidMount() {
    const { setAccountDetails, navigation } = this.props
    setAccountDetails(navigation.state.params.account)
  }

  _keyExtractor = (value, index) => index.toString()

  _renderToken = ({ item: token }) => (
    <View style={styles.tokenItem}>
      <Text>{token.symbol}</Text>
      <Text>{formatValue(token.value, token.magnitude)}</Text>
    </View>
  )

  _renderTransaction = ({ item: tx }) => (
    <View style={styles.txItem}>
      <TimeAgo date={tx.date} component={Text} style={styles.timeAgo}/>
      {
        (tx.type === 'OUT')
        ?  <Text style={styles.txValue}>-{tx.symbol} {formatValue(tx.value, tx.magnitude)}</Text>
        :  <Text style={[styles.txValue, styles.green]}>{tx.symbol} {formatValue(tx.value, tx.magnitude)}</Text>
      }
    </View>
  )


  getTokens(summary) {
    return summary.filter(token => token.symbol !== 'ETH')
  }

  getEth(summary) {
    return summary.find(token => token.symbol === 'ETH')
  }

  render() {
    const { openedList, toggleList, account = {} } = this.props
    const { isLoading, ops, summary } = account

    if (!isLoading && summary) {
      const tokens = this.getTokens(summary)
      const eth = this.getEth(summary)
      return (
        <View style={styles.container}>
          <View style={styles.jumbo}>
            <Text h3 bold>ETH {formatValue(eth.value, eth.magnitude)}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => toggleList('tokens')} style={[styles.headerAction, styles.borderTop]}>
              <Text h5 bold>
                Tokens
              </Text>
              <Icon
                name={ openedList === 'tokens' ? "chevron-down" : "chevron-right" }
                size={24}
                color="black"
                type="octicon" />
            </TouchableOpacity>
            {
              openedList === 'tokens' &&
              <FlatList
                data={tokens}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderToken}/>
            }
          </View>
          <View>
            <TouchableOpacity onPress={() => toggleList('transactions')} style={styles.headerAction}>
              <Text h5 bold>
                Transactions
              </Text>
              <Icon
                name={ openedList === 'transactions' ? "chevron-down" : "chevron-right" }
                size={24}
                color="black"
                type="octicon" />
            </TouchableOpacity>
            {
              openedList === 'transactions' &&
              <FlatList
              data={ops}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderTransaction}/>
            }
          </View>
        </View>
      )
    } else {
      return (
        <View style={[StyleSheet.absoluteFill, styles.centered]}>
          <Text>Loading...</Text>
        </View>
      )
    }
  }
}

// @TODO refactor access
const mapStateToProps = (state, { navigation }) => ({
  openedList: state.data.openedList,
  account: state.data.accounts[navigation.state.params.account],
})

const mapDispatchToProps = (dispatch) => ({
  setAccountDetails: (account) => dispatch(setAccountDetails(account)),
  toggleList: (name) => dispatch(toggleList(name)),
})


export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen)



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  jumbo: {
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  borderTop: {
    borderTopColor: 'lightgrey',
    borderTopWidth: 1,
  },
  headerAction: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  title: {},
  subTitle: {},
  tokenItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  txItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 15,
    paddingVertical: 10
  },
  txValue: {
    paddingVertical: 4,
    paddingHorizontal: 1,
  },
  green: {
    backgroundColor: '#5ad9bf',
    fontFamily: 'Lekton',
    fontSize: 18
  },
  timeAgo: {
    color: 'darkgrey'
  },
  centered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
})
