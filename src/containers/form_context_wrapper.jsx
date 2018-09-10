import React from 'react'
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
  formContext: React.PropTypes.shape({
    baseLocalPath: React.PropTypes.array,
    baseRemotePath: React.PropTypes.array,
    formKey: React.PropTypes.string
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
