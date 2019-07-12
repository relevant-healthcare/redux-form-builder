import React from 'react'
import { Field, TextAreaInput } from '../../build/index'

class AdditionalInfoToggle extends React.Component {
  state = {
    show: true
  }

  toggleShow = () => {
    this.setState({ show: !this.state.show })
  }

  render() {
    return (
      <div>
        <button type="button" className="additional-info-toggle" onClick={this.toggleShow}>Show Additional Info</button>
        { this.state.show && (
            <Field
              for="additional_info"
              label="Additional Info"
              input={TextAreaInput}
            />
        )}
      </div>
    )
  }
}

export default AdditionalInfoToggle
