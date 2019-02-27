import React, { PureComponent } from 'react'
import { differenceInHours, format } from 'date-fns'
import RTimeAgo from 'react-timeago'
import Text from './Text'

export default class TimeAgo extends PureComponent {

  formatter(value, unit, suffix, date, defaultFormatter) {
    const diff = differenceInHours(new Date(), date)
    if (diff <= 24) {
      return defaultFormatter()
    } else {
      return format(date, 'YYYY/MM/DD HH:mm')
    }
  }

  render() {
    const { size = 18, ...passThroughProps } = this.props
    return (
      <RTimeAgo formatter={this.formatter} component={Text} style={{ color: 'darkgrey', fontSize: size }} {...passThroughProps} />
    )
  }
}
