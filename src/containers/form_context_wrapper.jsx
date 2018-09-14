import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class FormContextWrapper extends React.Component {
  get baseLocalPath() {
    return (this.context.formContext || {}).baseLocalPath || []
  }

  get baseRemotePath() {
    return (this.context.formContext || {}).baseRemotePath || []
  }

  get formKey() {
    return (this.context.formContext || {}).formKey
  }

  get formContextState() {
    return _.pick(this, 'baseLocalPath', 'baseRemotePath', 'formKey')
  }

  render() {
    const Component = this.props.component
    return <Component {...this.props.mapStateToProps(this.formContextState)} {...this.props.childProps} />
  }
}

FormContextWrapper.contextTypes = {
  formContext: PropTypes.shape({
    baseLocalPath: PropTypes.array,
    baseRemotePath: PropTypes.array,
    formKey: PropTypes.string
  })
}


export default function(mapStateToProps) {
  return function(component) {
    return function(childProps) {
      return <FormContextWrapper
        mapStateToProps={mapStateToProps}
        component={component}
        childProps={childProps}
      />
    }
  }
}
