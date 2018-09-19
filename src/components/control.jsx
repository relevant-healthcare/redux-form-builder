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

function LabeledControl(props) {
  const Input = props.input
  return <div className="form-group">
      <div>
        <label className="control-label col-sm-2" htmlFor={props.id}>{props.label}</label>
      </div>
      <div className="col-sm-5">
        <div>
          {
            <Input {...props.inputProps} />
          }
        </div>
        {
          _.isEmpty(props.errors) ? null : (
            <span className="help-inline error-inline">
              {s.join(', ', ..._.map(props.errors, 'message'))}
            </span>
          )
        }
      </div>
    </div>
}

export {
  HiddenControl,
  LabeledControl,
  UnlabeledControl
}
