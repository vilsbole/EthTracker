import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Permissions } from 'expo'
import { utils } from 'ethers'

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

import { setValue, setAccountDetails } from '@store/actions'
import { fetchTxs, txsToOperations } from '@api/ledgerUtils'

class HomeScreen extends Component {
  // React-navigation hide header
  static navigationOptions = { header: null }

  state = {
    value: 'Hello',
    hasCameraPermission: null,
    address: null
  }

  _goToDetail = (account) => { this.props.navigation.navigate('Details', { account }) }

  _validateInput = (text) => this.setState({ value: text })

  _searchAddress = async () => {
    const account = '0xa910f92acdaf488fa6ef02174fb86208ad7722ba'
    // Add to store && And clear input
    this.props.storeValue(account)

    // Load tx
    this.props.setAccountDetails(account)

    // Go to detail page
    this._goToDetail(account)
  }

  _setAddress = (address) => this.setState({ address })

  _scanQRCode = async () => {
    if (!this.state.hasCameraPermission) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA)
      this.setState({ hasCameraPermission: status === 'granted' })
    }
    if (this.state.hasCameraPermission) {
      this.props.navigation.navigate('BarCode', { onSuccess: this._setAddress })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <View style={styles.titleContainer}>
            <Text h4 bold>Find an Ethereum Account</Text>
            <Text>{this.state.address}</Text>
          </View>
          <View style={styles.inputContainer}>
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
          <View style={styles.actionContainer}>
            <Button
              style={ true ? styles.action : '' }
              onPress={this._searchAddress}
              title="Search"/>
          </View>
        </View>
        <View style={styles.history}>
          <View style={styles.titleContainer}>
            <Text h4 bold>History</Text>
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
  storeValue: (value) => dispatch(setValue(value)),
  setAccountDetails: (account) => dispatch(setAccountDetails(account))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  titleContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  inputContainer: {
    paddingHorizontal: 16,
  },
  actionContainer: {
    paddingHorizontal: 16,
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
