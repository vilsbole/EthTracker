import React, { Component } from 'react'
import { StyleSheet, View } from  'react-native'
import { BarCodeScanner } from 'expo'

class BarCode extends Component {
  // React-navigation hide header
  // static navigationOptions = { header: { backgroundColor: 'transparent' } }

  handleBarCodeScanned = ({ type, data }) => {
    console.log('scanned', type, data)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />
      </View>
    )
  }
}

export default BarCode
