import React from 'react'
import PropTypes from 'prop-types'
import formContextWrapper from './form_context_wrapper'

class FieldSetWrapper extends React.Component {
  get localName() {
    return this.props.localName
  }

  get remoteName() {
    return this.props.remoteName
  }

  get formKey() {
    return this.props.formKey || this.props.inheritedFormKey
  }

  get baseLocalPath() {
    if (this.props.root) {
      return []
    }
    return this.props.baseLocalPath
  }

  get baseRemotePath() {
    if (this.props.root) {
      return []
    }
    return this.props.baseRemotePath
  }

  isNamePresent(name) {
    return name !== null && name !== undefined
  }

  get localPathAddition() {
    return this.isNamePresent(this.localName) ? [this.localName] : []
  }

  get remotePathAddition() {
    return this.isNamePresent(this.remoteName) ? [this.remoteName] : []
  }

  get localPath() {
    return this.baseLocalPath.concat(this.localPathAddition)
  }

  get remotePath() {
    return this.baseRemotePath.concat(this.remotePathAddition)
  }

  getChildContext() {
    return {
      formContext: {
        baseLocalPath: this.localPath,
        baseRemotePath: this.remotePath,
        formKey: this.formKey
      }
    }
  }

  render() {
    const Component = this.props.component
    return <Component {...this.props.childProps} />
  }
}

FieldSetWrapper.childContextTypes = {
  formContext: PropTypes.shape({
    baseLocalPath: PropTypes.array,
    baseRemotePath: PropTypes.array,
    formKey: PropTypes.string
  })
}

const FieldSetWrapperWithFormContext = formContextWrapper(
  ({ baseLocalPath, baseRemotePath, formKey }) => { return { baseLocalPath, baseRemotePath, inheritedFormKey: formKey } }
)(FieldSetWrapper)

export default function(mapPropsToFieldNames) {
  return function(component) {
    return function(childProps) {
      return <FieldSetWrapperWithFormContext
        component={component}
        childProps={childProps}
        {...mapPropsToFieldNames(childProps)}
      />
    }
  }
}
