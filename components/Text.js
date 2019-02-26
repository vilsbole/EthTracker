import React, { PureComponent } from 'react'
import { Text, ThemeProvider } from 'react-native-elements'

export default ({ children, bold, ...passThroughProps }) => {
  const theme = {
    Text: {
      style: {
        fontFamily: bold ? 'LektonBold' : 'Lekton',
        fontSize: 18
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Text {...passThroughProps}>{children}</Text>
    </ThemeProvider>
  )
}
