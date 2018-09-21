import React from 'react'
import update from 'react/lib/update'
import { formScopedStateWrapper } from '../../build/index'

class ClearNameButton extends React.Component {
  clearName = () => {
    this.props.onChange(update(this.props.owner, { name: { $set: '' }}))
  }

  render() {
    return <button type="button" onClick={this.clearName}>Clear name</button>
  }
}

export default formScopedStateWrapper((owner) => {
  return { owner }
})(ClearNameButton)
