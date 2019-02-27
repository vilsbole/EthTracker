import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'

import { Text, Currency, TimeAgo, Expandable } from '@components'
import { setAccountDetails, updateAccountDetails, toggleList } from '@store/actions'
import { getSummary, formatValue } from '@api/ledgerUtils'
import { convert } from '@api/utils'

const mapStateToProps = ({ data }, { navigation }) => ({
  expandedList: data.expandedList,
  account: data.accounts[navigation.state.params.account],
  meta: data.meta,
  quotes: data.quotes,
  isUpdating: data.isUpdating
})

const mapDispatchToProps = (dispatch) => ({
  setAccountDetails: (account) => dispatch(setAccountDetails(account)),
  toggleList: (name) => dispatch(toggleList(name)),
  updateAccountDetails: (account) => dispatch(updateAccountDetails(account))
})


class DetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Text bold numberOfLines={1} ellipsizeMode="middle">{navigation.state.params.account}</Text>,
    headerBackTitleStyle: { fontFamily: 'Lekton' },
  })

  componentDidMount() {
    const { setAccountDetails, navigation } = this.props
    setAccountDetails(navigation.state.params.account)
  }

  _refreshData = () => {
    const { updateAccountDetails, navigation } = this.props
    updateAccountDetails(navigation.state.params.account)
  }

  getTokens(summary) {
    return summary.filter(token => token.symbol !== 'ETH') || []
  }

  getEth(summary) {
    return summary.find(token => token.symbol === 'ETH') || {}
  }

  getPrice(quotes, symbol) {
    if (quotes && quotes[symbol])
      return quotes[symbol].quote['EUR'].price
  }

  precision(value, magnitude) {
    const number = formatValue(value, magnitude)
    if (isNaN(number)) return
    return number.toFixed(2)
  }


  _renderToken = ({ item: token }, quotes) => (
    <View style={styles.tokenItem}>
      <Text bold>{token.symbol} {this.precision(token.value, token.magnitude)}</Text>
      <Currency
        price={this.getPrice(quotes, token.symbol)}
        value={token.value}
        mag={token.magnitude}
        style={{ alignSelf: 'flex-end', color: 'darkgrey' }}
      />
    </View>
  )

  _renderTransaction = ({ item: tx }, quotes) => (
    <View style={styles.txItem}>
      <TimeAgo date={tx.date}/>
      <View style={{ flexDirection: 'column', alignItems: 'flex-end'}}>
        {
          (tx.type === 'OUT')
          ?  <Text style={styles.txValue}>-{tx.symbol} {this.precision(tx.value, tx.magnitude)}</Text>
          :  <Text style={[styles.txValue, styles.green]}>{tx.symbol} {this.precision(tx.value, tx.magnitude)}</Text>
        }
        <Currency
          price={this.getPrice(quotes, tx.symbol)}
          value={tx.value}
          mag={tx.magnitude}
          style={{ alignSelf: 'flex-end', color: 'darkgrey', fontSize: 16, paddingTop: 2 }}
          fontSize={12}
        />
      </View>
    </View>
  )

  render() {
    const { isUpdating, expandedList, toggleList, account = {} } = this.props
    const { isLoading, ops, summary } = account

    if (!isLoading && account && summary) {
      const tokens = this.getTokens(summary)
      const eth = this.getEth(summary)
      const { quotes } = this.props
      return (
        <View style={styles.container}>
          <View style={styles.jumbo}>
            <Text h3 bold>ETH {this.precision(eth.value, eth.magnitude)}</Text>
            <Currency
              h4
              price={this.getPrice(quotes, eth.symbol)}
              value={eth.value}
              mag={eth.magnitude}
              style={{ color: 'darkgrey' }}
            />
          </View>
          <Expandable
            firstOfKind
            title="Tokens"
            data={tokens}
            isExpanded={expandedList === 'tokens'}
            onPress={() => toggleList('tokens')}
            isRefreshing={isUpdating}
            onRefresh={this._refreshData}
            renderItem={(item) => this._renderToken(item, quotes)}
          />
          <Expandable
            title="Transactions"
            data={ops}
            isExpanded={expandedList === 'transactions'}
            onPress={() => toggleList('transactions')}
            isRefreshing={isUpdating}
            onRefresh={this._refreshData}
            renderItem={(item) => this._renderTransaction(item, quotes)}
          />
        </View>
      )
    } else {
      return (
        <View style={[StyleSheet.absoluteFill, styles.centered]}>
          <ActivityIndicator style={styles.activityIndicator} size="large" color="#000" />
        </View>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  jumbo: {
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
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
    paddingVertical: 1,
    paddingHorizontal: 1,
  },
  green: {
    backgroundColor: '#5ad9bf',
    fontFamily: 'Lekton',
    fontSize: 18,
    borderRadius: 3,
  },
  centered: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  activityIndicator: {
    marginBottom: 100
  },
})
