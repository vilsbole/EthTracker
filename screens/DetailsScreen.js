import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'

import { Text } from '@components'
import { getSummary } from '@api/ledgerUtils'
import { toggleList } from '@store/actions'

class DetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params ? `${navigation.state.params.account}` : 'undefined',
    headerTitleStyle: { fontFamily: 'LektonBold' },
    headerBackTitleStyle: { fontFamily: 'Lekton' },
  })

  _keyExtractor = (value, index) => index.toString()

  _renderToken = ({ item: token }) => (
    <ListItem
      title={token.symbol}
      titleStyle={styles.title}
      subTitle={token.value}/>
  )
  _renderTransaction = ({ item: tx }) => (
    <ListItem
      title={tx.type}
      titleStyle={styles.title}
      subTitle={tx.value} />
  )

  render() {
    const { openedList, toggleList } = this.props
    const { isLoading, ops, summary } = this.props.account

    if (isLoading) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.jumbo}>
          <Text h3 bold>Hello</Text>
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
              data={summary}
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
  }
}

// @TODO refactor access
const mapStateToProps = (state, { navigation }) => ({
  openedList: state.data.openedList,
  account: state.data.accounts[navigation.state.params.account]
})

const mapDispatchToProps = (dispatch) => ({
  toggleList: (name) => dispatch(toggleList(name))
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  title: {},
  subTitle: {},
})
