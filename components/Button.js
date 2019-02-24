import React, { PureComponent } from 'react'
import { Button, ThemeProvider } from 'react-native-elements'

const theme = {
  Button: {
    buttonStyle: {
      backgroundColor: '#000',
      width: 200
    },
    titleStyle: {
      fontFamily: 'Lekton',
    },
  }
}

export default ({ children, ...passThroughProps }) => (
  <ThemeProvider theme={theme}>
    <Button {...passThroughProps}>{children}</Button>
  </ThemeProvider>
)
