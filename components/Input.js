import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { Input, ThemeProvider } from 'react-native-elements'

const theme = {
  Input: {
    containerStyle: {
      paddingHorizontal: 0,
    },
    inputStyle: {
      fontFamily: 'Lekton',
    },
    errorStyle: {
      fontFamily: 'Lekton',
      fontSize: 12,
      marginLeft: 0,
      color: 'red',
    }
  }
}

export default ({ children, errorMessage, ...passThroughProps }) => (
  <ThemeProvider theme={theme}>
    <Input errorMessage={errorMessage} {...passThroughProps}>{children}</Input>
    {
      !errorMessage &&  <View style={{ minHeight: 22 }}></View>
    }
  </ThemeProvider>
)
