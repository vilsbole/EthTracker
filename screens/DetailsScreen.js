import React, { Component } from 'react'
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
} from 'react-native'

const { width, height } = Dimensions

class DetailsScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.item}`
  })

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
      </View>
    )
  }
}
export default DetailsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    height: height,
    // alignItems: 'center',
    justifyContent: 'center'
  }
})
