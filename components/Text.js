import React, { PureComponent } from 'react'
import { Text, ThemeProvider } from 'react-native-elements'

const theme = {
  Text: {
    style: {
      fontFamily: 'Lekton',
      fontSize: 18
    }
  }
}

export default ({ children, ...passThroughProps }) => (
  <ThemeProvider theme={theme}>
    <Text {...passThroughProps}>{children}</Text>
  </ThemeProvider>
)
