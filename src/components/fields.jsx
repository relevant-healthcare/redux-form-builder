import React from 'react'
import fieldSetWrapper from '../containers/field_set_wrapper'

class Fields extends React.Component {
  render() {
    return this.props.children
  }
}

export default fieldSetWrapper((props) => {
  return { localName: props['for'], remoteName: (props.hasOwnProperty('as') ? props['as'] : props['for']) }
})(Fields)
