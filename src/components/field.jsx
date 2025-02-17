import React from 'react'
import s from 'underscore.string'
import _ from 'lodash'
import formContextWrapper from '../containers/form_context_wrapper'
import formScopedStateWrapper from '../containers/form_scoped_state_wrapper'
import { LabeledControl } from './control'
import { TextInput } from './input'

class Field extends React.Component {
  get localName() {
    return this.props['for']
  }

  get remoteName() {
    return this.props.hasOwnProperty('as') ? this.props['as'] : this.localName
  }

  get pathRoot() {
    return this.fullRemotePath[0]
  }

  get fullRemotePath() {
    return this.props.baseRemotePath.concat([this.remoteName])
  }

  get fullLocalPath() {
    return [this.pathRoot].concat(this.props.baseLocalPath, this.localName)
  }

  get inputId() {
    return s.underscored(s.join('_', ...this.fullLocalPath))
  }

  get label() {
    return this.props.label || s.humanize(this.localName)
  }

  get inputName() {
    const first = s.underscored(this.pathRoot)
    const rest = _.drop(this.fullRemotePath)
    const indexedRest = rest.map(n => { return `[${s.underscored(n)}]` })

    return `${first}${s.join('', ...indexedRest)}`
  }

  get inputValue() {
    return this.props[this.localName]
  }

  onChange = (event) => {
    if (event.stopPropagation) { event.stopPropagation() }

    let updateObj = { [this.localName]: event.target.value };
    if (this.props.onChangeModifier) {
      updateObj = this.props.onChangeModifier(updateObj)
    }
    this.props.onChange(updateObj)
  }

  get control() {
    return this.props.control || LabeledControl
  }

  get errors() {
    const errorAttribute = s.underscored(this.remoteName)
    return _.filter(this.props.errors, (error) => (
      error.attribute && ((error.attribute === errorAttribute) || (error.attribute === this.props.errorKey))
    ))
  }

  get sharedProps() {
    return {
      id: this.inputId,
      label: this.label,
      name: this.inputName,
      value: this.inputValue,
      onChange: this.onChange
    }
  }

  componentWillUnmount() {
    if (this.props.clearStateOnUnmount) {
      this.props.onChange({ [this.localName]: null })
    }
  }

  render() {
    const Control = this.control
    const sharedProps = this.sharedProps
    const inputProps = _.assign({ }, sharedProps, this.props.inputProps)
    return <div onChange={(e) => e.stopPropagation()}>
      <Control
        errors={this.errors}
        input={this.props.input || TextInput}
        inputProps={inputProps}
        { ...sharedProps }
        { ...this.props.controlProps }
      />
    </div>
  }
}

export default formScopedStateWrapper((object, props) => {
  return {
    [props['for']]: object[props['for']],
    errors: object.errors
  }
})(formContextWrapper(({ baseRemotePath, baseLocalPath }) => { return { baseRemotePath, baseLocalPath } })(Field))
