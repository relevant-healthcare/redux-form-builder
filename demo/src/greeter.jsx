import React from 'react'
import { formScopedStateWrapper } from '../../build/index'

class Greeter extends React.Component {
  render() {
    return <div>Hello, {this.props.name}!</div>
  }
}

export default formScopedStateWrapper(({ name }) => {
  return { name }
})(Greeter)
