import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { setValue } from '@store/actions'

class HomeScreen extends Component {
  state = {
    value: 'Hello'
  }

  _goToDetail = (item) => {
    console.log('Goto', item)
    this.props.navigation.navigate('Details', {
      item
    })
  }

  _validateInput = (text) => this.setState({ value: text })

  _onPress = () => this.props.storeValue(this.state.value)

  _keyExtractor = (item, index) => index.toString()

  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={this._goToDetail.bind(this, item)}>
      <Text>{item}</Text>
    </TouchableOpacity>
  )

  render() {
    return (
      <View>
        <TextInput
          style={styles.input}
          onChangeText={(text) => { this._validateInput(text) }} />
        <Button
          onPress={this._onPress}
          title="Search"
        />
        <FlatList
          data={this.props.values}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem} />
      </View>
    )
  }
}


const mapStateToProps = ({ data }) => ({
  values: data.values
})

const mapDispatchToProps = (dispatch) => ({
  storeValue: (value) => dispatch(setValue(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const styles = StyleSheet.create({
  input: {
    width: 200,
    height: 200,
    backgroundColor: 'red',
  }
})
