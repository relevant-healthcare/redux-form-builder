import React from 'react'
import s from 'underscore.string'
import _ from 'lodash'

function SimpleInput(type) {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.debouncedOnChange = _.debounce(this.props.onChange || function(){}, 200)
    }

    onChange = ({ target: { value } }) => {
      this.debouncedOnChange({ target: { value } })
    }

    render() {
      let { className, value, onChange, ...otherProps } = this.props
      className = className || 'input form-control'
      return <input type={type} className={className} onChange={this.onChange} defaultValue={value} {...otherProps} />
    }
  }
}

const TextInput = SimpleInput('text')
const DateInput = SimpleInput('date')
const HiddenInput = SimpleInput('hidden')

class CheckboxInput extends React.Component {
  onChange = ({ target: { checked } }) => {
    this.props.onChange({ target: { value: checked } })
  }

  render() {
      let { value, onChange, className, ...otherProps } = this.props
      return <div>
        <input type='hidden' value="0" {...otherProps} />
        <input type='checkbox' value="1" onChange={this.onChange} defaultChecked={value} {...otherProps} />
      </div>
  }
}

function TextAreaInput(props) {
  return <textarea {...props} />
}

function SelectInput({ options, ...props }) {
  const { className, value, ...otherProps } = props
  const propsWithDefaults = {
    className: className || 'input form-control',
    value: value || options[0].value
  }
  return <select {...propsWithDefaults} {...otherProps}>
    {
      options.map(({ name, value }) => {
        return <option value={value} key={`${name}-${value}`}>{name}</option>
      })
    }
  </select>
}

class RadioButtonGroupInput extends React.Component {
  get id() {
    return this.props.id
  }

  render() {
    return <div className="radio-btn-group" id={this.id}>
      {
        this.props.options.map((option, index) => {
          const inputId = `${this.id}_${s.underscored(option.value)}`
          return [
            <input
              key={`${index}-input`}
              type="radio"
              value={option.value}
              name={this.props.name}
              id={inputId}
              checked={option.value === this.props.value}
              onChange={this.props.onChange}
            />,
            <label className="btn btn-default" htmlFor={inputId} key={`${index}-label`}>
              {option.name}
            </label>
          ]
        })
      }
    </div>
  }
}

export {
  CheckboxInput,
  HiddenInput,
  RadioButtonGroupInput,
  SelectInput,
  TextAreaInput,
  TextInput,
  DateInput
}
