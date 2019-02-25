import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View } from  'react-native'
import { BarCodeScanner } from 'expo'

class BarCode extends Component {
  // Custom Navigation Header
  static navigationOptions = () => ({
    title: 'Scan QR Code',
    headerTintColor: '#fff',
    headerTitleStyle: { fontFamily: 'Lekton' },
    headerBackTitleStyle: { fontFamily: 'Lekton' },
    headerTransparent: true,
    headerStyle: { borderBottomWidth: 0 }
  })

  handleBarCodeScanned = ({ type, data }) => {
    const { navigation } = this.props
    console.debug('Scanned', type, data)
    navigation.goBack()
    navigation.state.params.onSuccess(data)
  }

  render() {
    const { onSuccess } = this.props
    return (
      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFill}/>
      </View>
    )
  }
}


export default BarCode
