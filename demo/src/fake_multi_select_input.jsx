import React from 'react'
import s from 'underscore.string'

class FakeMultiSelectInput extends React.Component {
  render() {
    return <div>
        <span>{this.props.value}</span>
        <input onChange={this.props.onChange} id={this.props.id} />
      </div>
  }
}

export default FakeMultiSelectInput
