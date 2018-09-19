import React from 'react'
import { TextInput, HiddenInput } from './input'
import s from 'underscore.string'

function HiddenControl(props) {
  const { id, name, value } = props.inputProps
  return <HiddenInput id={id} name={name} value={value} />
}

function UnlabeledControl(props) {
  const Input = props.input
  return <div>
    <Input {...props.inputProps} />
      {
        _.isEmpty(props.errors) ? null : (
          <span className="help-inline error-inline">
            {s.join(', ', ..._.map(props.errors, 'message'))}
          </span>
        )
      }
  </div>
}

class LabeledControl extends React.Component {
  get hasErrors() {
    return _.some(this.props.errors)
  }

  get groupClassName() {
    if (this.hasErrors) {
      return 'form-group error'
    }
    return 'form-group'
  }

  render() {
    const Input = this.props.input
    return <div className={this.groupClassName}>
      <div>
        <label className="control-label col-sm-2" htmlFor={this.props.id}>{this.props.label}</label>
      </div>
      <div className="col-sm-5">
        <div>
          {
            <Input {...this.props.inputProps} />
          }
        </div>
        {
          this.hasErrors ? (
            <span className="help-inline error-inline">
              {s.join(', ', ..._.map(this.props.errors, 'message'))}
            </span>
          ) : null
        }
      </div>
    </div>
  }
}

export {
  HiddenControl,
  LabeledControl,
  UnlabeledControl
}
