import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { AppLoading, Font } from 'expo'

import { persistor, store } from '@store'
import HomeScreen from '@screens/HomeScreen'
import DetailsScreen from '@screens/DetailsScreen'
import BarCode from '@screens/BarCodeScreen'

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    BarCode: BarCode,
  },
  {
    initialRouteName: 'Home'
  }
)
const AppContainer = createAppContainer(AppNavigator)

export default class App extends React.Component {
  state = { isReady: false }

  async componentWillMount() {
    await Font.loadAsync({
      'Lekton': require('@assets/fonts/Lekton-Regular.ttf'),
      'LektonBold': require('@assets/fonts/Lekton-Bold.ttf'),
    }).then(() => this.setState({ isReady: true }))
  }

  render() {
    if (!this.state.isReady) { return (<AppLoading />) }
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer style={styles.container}/>
        </PersistGate>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
