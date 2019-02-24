import React, { PureComponent } from 'react'
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
      fontSize: 12
    }
  }
}

export default ({ children, ...passThroughProps }) => (
  <ThemeProvider theme={theme}>
    <Input {...passThroughProps}>{children}</Input>
  </ThemeProvider>
)
