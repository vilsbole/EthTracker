import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import TimeAgo from 'react-timeago'
import { Text } from '@components'

class AddressList extends PureComponent {
  static propTypes = {
    history: PropTypes.array,
    onPress: PropTypes.func
  }

  _keyExtractor = (value, index) => index.toString()

  _renderItem = ({ item: search }) => (
    <ListItem
      Component={TouchableOpacity}
      onPress={() => this.props.onPress(search.value)}
      titleStyle={styles.title}
      containerStyle={styles.item}
      title={search.value}
      subtitle={<TimeAgo date={search.date} component={Text} style={styles.timeAgo}/>}
    />
  )

  render() {
    const { history } = this.props
    return (
      <FlatList
        style={styles.scrollView}
        data={history}
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
    flexGrow: 0
  },
  timeAgo: {
    fontSize: 12,
    color: 'darkgrey'
  }
})
