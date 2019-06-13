import React from 'react'
import { connect } from 'react-redux'
import fieldSetWrapper from '../containers/field_set_wrapper'
import formScopedStateWrapper from '../containers/form_scoped_state_wrapper'
import { setFormObject } from '../actions/index'
import _ from 'lodash'

class Form extends React.Component {
  get isPersisted() {
    return this.props.object.id !== '' && this.props.object.id !== null && this.props.object.id !== undefined
  }

  get action() {
    if (this.isPersisted) {
      return `${this.props.path}/${this.props.object.id}`
    }
    return this.props.path
  }

  onSubmit = (event) => {
    if (this.props.onSubmit) {
      this.props.onSubmit({ syntheticEvent: event, target: { value: this.props.object }})
    }
  }

  render() {
    const htmlFormProps = _.pick(this.props, 'className', 'onChange')

    return <form action={this.action} method="post" {...htmlFormProps} onSubmit={this.onSubmit}>
      <input name="utf8" type="hidden" value="✓" />
      {this.isPersisted ? <input type="hidden" name="_method"  value="patch" /> : null}
      <input type="hidden" name="authenticity_token" value={this.props.authenticityToken} />
      {this.props.children}
    </form>
  }
}

const StatefulForm = formScopedStateWrapper((object) => { return { object } })(Form)

const FormFieldSet = fieldSetWrapper((props) => {
  return { localName: null, remoteName: props['as'], formKey: props['formKey'] || props['as'] }
})(StatefulForm)

class FormInitializer extends React.Component {
  constructor(props) {
    super(props)

    props.setFormObject(props.formKey || props.as, props['for'])
  }

  componentWillReceiveProps(props) {
    if (!props.formKey && !props.as) {
      throw 'Form rendered without a value for formKey or as. Form requires setting either the formKey or as prop.'
    }

    if (
      !_.isEqual(this.props['for'], props['for']) ||
      !_.isEqual(this.props.formKey, props.formKey) ||
      !_.isEqual(this.props.as, props.as)
    ) {
      this.props.setFormObject(props.formKey || props.as, props['for'])
    }
  }

  render() {
    const childProps = _.omit(this.props, 'setFormObject')
    return <FormFieldSet {...childProps} />
  }
}

export default connect(() => { return {} }, { setFormObject })(FormInitializer)
