import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Permissions } from 'expo';

import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import {
  Icon
} from 'react-native-elements'

import {
  AddressList,
  Button,
  Input,
  Text,
} from '@components'

import { setValue } from '@store/actions'

class HomeScreen extends Component {
  // React-navigation hide header
  static navigationOptions = { header: null }

  state = {
    value: 'Hello',
    hasCameraPermission: null,
  }

  _goToDetail = (item) => { this.props.navigation.navigate('Details', { item }) }

  _validateInput = (text) => this.setState({ value: text })

  _onPress = () => this.props.storeValue(this.state.value)

  _scanQRCode = async () => {
    if (!this.state.hasCameraPermission) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA)
      this.setState({ hasCameraPermission: status === 'granted' })
    }
    if (this.state.hasCameraPermission) {
      this.props.navigation.navigate('BarCode')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <View style={styles.titleContainer}>
            <Text h4 style={styles.titleText}>Find an Ethereum Account</Text>
          </View>
          <View>
            <Input
              style={styles.input}
              placeholder="0xa910f92..."
              errorStyle={{ color: 'red' }}
              errorMessage={ false ? '' : 'Enter a valid address' }
              onChangeText={this._validateInput}
              rightIcon={
                <TouchableOpacity onPress={this._scanQRCode}>
                  <Icon
                    name="device-camera"
                    size={24}
                    color="black"
                    type="octicon" />
                </TouchableOpacity>
              }/>
          </View>
          <View>
            <Button
              style={ true ? styles.action : '' }
              onPress={this._onPress}
              title="Search"/>
          </View>
        </View>
        <View style={styles.history}>
          <View style={styles.titleContainer}>
            <Text h4 style={styles.titleText}>History</Text>
          </View>
          <View>
            <AddressList
              style={styles.scrollView}
              onPress={this._goToDetail}
              addresses={this.props.values} />
          </View>
        </View>
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
  container: {
    flex: 1,
    paddingHorizontal: 20,
    display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  titleContainer: {
    paddingVertical: 20
  },
  titleText: {
    fontFamily: 'LektonBold'
  },
  action: {
    alignSelf: 'flex-end',
    marginTop: 12.5
  },
  history: {
    marginTop: 40,
  },
  search: {
    marginTop: 150
  },
  scrollView: {
    height: 300
  },
})
