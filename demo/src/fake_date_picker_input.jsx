import React from 'react'
import _ from 'lodash'

class FakeDatePickerInput extends React.Component {
  state = {
    date: ''
  }

  get isValidDate() {
    return this.state.date.length === 10
  }

  componentDidUpdate() {
    if (this.isValidDate) {
      this.props.onChange({ target: { value: this.state.date }})
    }
  }

  updateDate = (event) => {
    const newDate = event.target.value
    this.setState(() => { return { date: newDate } })
  }

  render() {
    return <input
      id={this.props.id}
      value={this.state.date}
      onChange={this.updateDate}
    />
  }
}

export default FakeDatePickerInput
