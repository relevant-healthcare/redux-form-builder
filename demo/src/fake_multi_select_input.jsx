import React from 'react'
import s from 'underscore.string'
import _ from 'lodash'

class FakeMultiSelectInput extends React.Component {
  render() {
    return <div>
        <span>{this.props.value}</span>
        <input onChange={this.props.onChange} id={this.props.id} />
      </div>
  }
}

export default FakeMultiSelectInput
