import React from 'react';
import entryPoint from './entry_point.js'
import Form, {
  Field,
  Fields,
  DateInput }
from '../../build/index.js';

class MyForm extends React.Component {
  render() {
    return <Form
      for={{ owner: { name: '', birthdate: '' }}}
      as="dog"
      authenticityToken={''}
      className="form-horizontal"
      path="/dogs"
      formKey={'DOG_FORM_KEY'}
      >
      <div>Form!!!</div>
      <Fields for="owner">
        <div>
          <Field for="name"/>
          <Field for="birthdate"/>
        </div>
      </Fields>
    </Form>
  }
}

export default entryPoint(MyForm)
