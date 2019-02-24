import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { List, ListItem } from 'react-native-elements'

import { Text } from '@components'

class AddressList extends PureComponent {
  static propTypes = {
    addresses: PropTypes.array,
    onPress: PropTypes.func
  }

  _keyExtractor = (value, index) => index.toString()

  _renderItem = ({ item: address }) => (
    <TouchableOpacity onPress={() => this.props.onPress(address)}>
      <ListItem
        titleStyle={styles.title}
        containerStyle={styles.item}
        title={address}
        />
    </TouchableOpacity>
  )

  render() {
    const { addresses } = this.props
    return (
      <FlatList
        style={styles.scrollView}
        data={addresses}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem} />
    )
  }
}


export default AddressList

const styles = StyleSheet.create({
  container: {

  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  title: {
    fontFamily: 'Lekton'
  },
  scrollView: {
    flexGrow: 0,
    height: 350
  },
})
