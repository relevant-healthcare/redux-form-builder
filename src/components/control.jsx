import React from 'react'
import { Popover, OverlayTrigger } from 'react-bootstrap'
import { HiddenInput } from './input'
import s from 'underscore.string'
import _ from 'lodash'

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
  const hasError = !_.isEmpty(props.errors)
  const popover = _.isEmpty(props.helpPopover) ? null : (
    <Popover id="popover-trigger-click-root-close" title={props.helpPopover.title}>
      {props.helpPopover.contents}
    </Popover>
  )

  return <div className={`form-group control-group ${hasError ? 'error' : ''}`}>
      <div>
        <label className="control-label col-sm-2" htmlFor={props.id}>
          {props.label}{' '}
          {_.isEmpty(props.helpPopover) ? null : (
            <OverlayTrigger trigger="click" rootClose placement="right" overlay={popover}>
              <a href="#" className="label label-info popup-marker">{props.helpPopover.label}</a>
            </OverlayTrigger>
          )}
        </label>
      </div>
      <div className="controls col-sm-5">
        <div>
          {
            <Input {...props.inputProps} />
          }
        </div>
        {
          hasError ? (
            <span className="help-inline error-inline">
              {s.join(', ', ..._.map(props.errors, 'message'))}
            </span>
          ) : null
        }
      </div>
    </div>
}

export {
  HiddenControl,
  LabeledControl,
  UnlabeledControl
}
