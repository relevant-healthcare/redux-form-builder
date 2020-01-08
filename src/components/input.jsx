import React from 'react'
import s from 'underscore.string'
import debounce from 'lodash/debounce'

function SimpleInput(type) {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.debouncedOnChange = debounce(this.props.onChange || function(){}, 200)
    }

    onChange = (event) => {
      event.stopPropagation()
      this.debouncedOnChange({ target: { value: event.target.value } })
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
  onChange = (event) => {
    event.stopPropagation()
    this.props.onChange({ target: { value: event.target.checked } })
  }

  render() {
    const{ value, onChange, ...otherProps } = this.props
    return <div>
      { !value && <input type='hidden' value="0" {...otherProps} /> }
      <input type='checkbox' checked={value} onChange={this.onChange} {...otherProps} />
    </div>
  }
}

function TextAreaInput({ className, ...otherProps }) {
  className = className || 'input form-control'

  return <textarea className={className} {...otherProps} />
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
  DateInput,
  HiddenInput,
  RadioButtonGroupInput,
  SelectInput,
  TextAreaInput,
  TextInput
}
