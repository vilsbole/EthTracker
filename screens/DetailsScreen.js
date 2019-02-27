import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'

import { Text, Currency, TimeAgo } from '@components'
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

  _keyExtractor = (value, index) => index.toString()

  _renderToken = ({ item: token }, quotes) => (
    <View style={styles.tokenItem}>
      <Text bold>{token.symbol} {formatValue(token.value, token.magnitude)}</Text>
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
          ?  <Text style={styles.txValue}>-{tx.symbol} {formatValue(tx.value, tx.magnitude)}</Text>
          :  <Text style={[styles.txValue, styles.green]}>{tx.symbol} {formatValue(tx.value, tx.magnitude)}</Text>
        }
        <Currency
          price={this.getPrice(quotes, tx.symbol)}
          value={tx.value}
          mag={tx.magnitude}
          style={{ alignSelf: 'flex-end', color: 'darkgrey', fontSize: 14, paddingTop: 2 }}
          fontSize={12}
        />
      </View>
    </View>
  )

  _refreshData = () => {
    const { updateAccountDetails, navigation } = this.props
    updateAccountDetails(navigation.state.params.account)
  }

  getTokens(summary) {
    return summary.filter(token => token.symbol !== 'ETH')
  }

  getEth(summary) {
    return summary.find(token => token.symbol === 'ETH')
  }

  isEmpty(list) {
    return list.length === 0
  }

  getPrice(quotes, symbol) {
    if (!quotes && quotes[symbol]) return
    return quotes[symbol].quote['EUR'].price
  }

  render() {
    const { isUpdating, expandedList, toggleList, account = {} } = this.props
    const { isLoading, ops, summary } = account

    if (account && !isLoading && summary) {
      const tokens = this.getTokens(summary)
      const eth = this.getEth(summary)
      const { quotes } = this.props
      return (
        <View style={styles.container}>
          <View style={styles.jumbo}>
            <Text h3 bold>ETH {formatValue(eth.value, eth.magnitude)}</Text>
            <Currency
              h5
              price={this.getPrice(quotes, eth.symbol)}
              value={eth.value}
              mag={eth.magnitude}
              style={{ color: 'darkgrey' }}
            />
          </View>
          <View>
            <TouchableOpacity
              disabled={this.isEmpty.apply(this, [tokens])}
              onPress={() => toggleList('tokens')}
              style={[styles.headerAction, styles.borderTop]}>
              <View style={styles.toggableTitle}>
                <Text h4 bold>Tokens</Text>
                <Text style={styles.light}>({tokens.length})</Text>
              </View>
              <Icon
                name={ expandedList === 'tokens' ? "chevron-down" : "chevron-right" }
                size={24}
                color={ this.isEmpty(tokens) ? 'lightgrey': 'black'}
                type="octicon" />
            </TouchableOpacity>
            {
              expandedList === 'tokens' &&
              <FlatList
                data={tokens}
                keyExtractor={this._keyExtractor}
                onRefresh={this._refreshData}
                refreshing={isUpdating}
                renderItem={(item) => this._renderToken(item, quotes)}/>
            }
          </View>
          <View>
            <TouchableOpacity
              disabled={this.isEmpty.apply(this, [ops])}
              onPress={() => toggleList('transactions')}
              style={styles.headerAction}>
              <View style={styles.toggableTitle}>
                <Text h4 bold>Transactions</Text>
                <Text style={styles.light}>({ops.length})</Text>
              </View>
              <Icon
                name={ expandedList === 'transactions' ? "chevron-down" : "chevron-right" }
                size={24}
                color="black"
                type="octicon" />
            </TouchableOpacity>

              {
                expandedList === 'transactions' &&
                  <FlatList
                    data={ops}
                    onRefresh={this._refreshData}
                    refreshing={isUpdating}
                    keyExtractor={this._keyExtractor}
                    renderItem={(item) => this._renderTransaction(item, quotes)}/>
              }
          </View>
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
    paddingVertical: 1,
    paddingHorizontal: 1,
  },
  green: {
    backgroundColor: '#5ad9bf',
    fontFamily: 'Lekton',
    fontSize: 18
  },
  centered: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  activityIndicator: {
    marginBottom: 100
  },
  toggableTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'

  },
  light: {
    color: 'darkgrey',
    fontSize: 20,
    textAlignVertical: 'bottom',
    marginLeft: 3,
    marginBottom: -2,
  }
})
