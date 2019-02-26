import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Permissions } from 'expo'
import { utils } from 'ethers'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'

import { setSearchHistory } from '@store/actions'
import { fetchTxs, txsToOperations, isValidEthereum } from '@api/ledgerUtils'
import {
  AddressList,
  Button,
  Input,
  Text,
} from '@components'

const mapStateToProps = ({ data }) => ({
  history: data.history
})

const mapDispatchToProps = (dispatch) => ({
  setHistory: (value) => dispatch(setSearchHistory(value)),
})

class HomeScreen extends Component {
  static navigationOptions = { header: null }

  state = {
    hasCameraPermission: null,
    address: null,
    errorMsg: null,
    isDisabled: true,
  }

  _goToDetail = (account) => { this.props.navigation.navigate('Details', { account }) }

  _validate = (val) => {
    if (isValidEthereum(this.state.address)) {
      this.setState({ isDisabled: false })
    } else {
      this.setState({ isDisabled: true })
      this.setState({ errorMsg: 'Please enter a valid Ethereum Address'})
    }
  }

  _searchAddress = () => {
    const account = this.state.address
    // Add to store && And clear input
    this.props.setHistory(account)
    this._goToDetail(account)
  }

  _setAddress = (address) => this.setState({ address: address.trim() })
  _clearError = () => this.setState({ errorMsg: null })

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
    const { isDisabled, errorMsg } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <View style={styles.titleContainer}>
            <Text h4 bold>Track an Ethereum Account</Text>
          </View>
          <View style={styles.inputContainer}>
            <Input
              style={styles.input}
              autoFocus={true}
              clearButtonMode="always"
              placeholder="0xa910f92..."
              errorMessage={errorMsg}
              onChangeText={this._setAddress}
              onBlur={this._validate}
              onFocus={this._clearError}
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
              disabled={isDisabled}
              style={ true ? styles.action : '' }
              onPress={() => this._searchAddress()}
              title="Search"/>
          </View>
        </View>
        <View style={styles.history}>
          <View style={styles.titleContainer}>
            <Text h4 bold>History</Text>
          </View>
          <AddressList
            style={styles.scrollView}
            onPress={this._goToDetail}
            history={this.props.history} />
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
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
