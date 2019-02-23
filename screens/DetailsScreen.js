import React, { Component } from 'react'
import { Text, View } from 'react-native'

class DetailsScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.item}`
  })

  render() {
    return (
      <View>
        <Text>Hello</Text>
      </View>
    )
  }
}

export default DetailsScreen
