import React from 'react'
import filter from 'lodash/filter'
import some from 'lodash/some'
import formScopedStateWrapper from '../containers/form_scoped_state_wrapper'

class ErrorMessages extends React.Component {
  get errors() {
    return this.props.errors || {}
  }

  get baseErrors() {
    return filter(this.errors, (error) => { return error.attribute == 'base' })
  }

  get hasErrors() {
    return some(this.errors)
  }

  render() {
    if (!this.hasErrors) {
      return null
    }

    return <div className="alert alert-danger alert-error">
      <p><strong>Something is wrong.</strong></p>
      <ul>
        {
          this.baseErrors.map((error, idx) => {
            return <li key={idx}>{error.message}</li>
          })
        }
      </ul>
    </div>
  }
}

export default formScopedStateWrapper(({ errors }) => { return { errors } })(ErrorMessages)
