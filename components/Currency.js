import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Text from './Text'
import { convert } from '@api/utils'

export default class Currency extends PureComponent {
  static propTypes = {
    price: PropTypes.number,
    value: PropTypes.number,
    mag: PropTypes.number,
  }

  render() {
    const { price, value, mag, ...passThroughProp } = this.props
    const converted = convert(price, value, mag)
    return <Text {...passThroughProp}>{`${converted.toFixed(2).toLocaleString()} €`}</Text>
  }
}
