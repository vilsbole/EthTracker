import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'

import Text from './Text'

export default class Expandable extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    firstOfKind: PropTypes.bool,
    isRefreshing: PropTypes.bool,
    isExpanded: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    renderItem: PropTypes.func.isRequired
  }

  _keyExtractor = (value, index) => index.toString()
  isEmpty(list) { return list.length === 0 }

  render() {
    const { onPress, onRefresh, renderItem } = this.props
    const { title, data, isRefreshing, isExpanded, firstOfKind } = this.props
    return (
      <View>
        <TouchableOpacity
          disabled={this.isEmpty(data)}
          onPress={onPress}
          style={[styles.headerAction, (firstOfKind && styles.borderTop)]}>
          <View style={styles.toggableTitle}>
            <Text h4 bold>{title}</Text>
            <Text style={styles.light}>({data.length})</Text>
          </View>
          <Icon
            name={ isExpanded ? "chevron-down" : "chevron-right" }
            size={24}
            color={ this.isEmpty(data) ? 'lightgrey': 'black'}
            type="octicon" />
        </TouchableOpacity>
        {
          isExpanded &&
          <FlatList
            data={data}
            keyExtractor={this._keyExtractor}
            onRefresh={onRefresh}
            refreshing={isRefreshing}
            renderItem={renderItem}/>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerAction: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  borderTop: {
    borderTopColor: 'lightgrey',
    borderTopWidth: 1,
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
