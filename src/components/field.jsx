import React from 'react'
import update from 'react/lib/update'
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

  get fullRemotePath() {
    return this.props.baseRemotePath.concat([this.remoteName])
  }

  get inputId() {
    return s.underscored(s.join('_', ...this.fullRemotePath))
  }

  get label() {
    return this.props.label || s.humanize(this.localName)
  }

  get inputName() {
    const first = s.underscored(this.fullRemotePath[0])
    const rest = _.drop(this.fullRemotePath)
    const indexedRest = rest.map(n => { return `[${s.underscored(n)}]` })

    return `${first}${s.join('', ...indexedRest)}`
  }

  get inputValue() {
    return this.props[this.localName]
  }

  onChange = (event) => {
    this.props.onChange({ [this.localName]: event.target.value })
  }

  get control() {
    return this.props.control || LabeledControl
  }

  get errors() {
    const errorAttribute = s.underscored(this.remoteName)
    return _.filter(this.props.errors, (error) => { return error.attribute === errorAttribute })
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

  render() {
    const Control = this.control
    const sharedProps = this.sharedProps
    const inputProps = _.assign({ className: 'form-control' }, sharedProps, this.props.inputProps)
    return <Control
      errors={this.errors}
      input={this.props.input || TextInput}
      inputProps={inputProps}
      { ...sharedProps }
      { ...this.props.controlProps }
    />
  }
}

export default formScopedStateWrapper((object, props) => {
  return {
    [props['for']]: object[props['for']],
    errors: object.errors
  }
})(formContextWrapper(({ baseRemotePath }) => { return { baseRemotePath } })(Field))
