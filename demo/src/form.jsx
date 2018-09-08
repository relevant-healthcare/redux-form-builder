import React from 'react';
import entryPoint from './entry_point.js'
import Form from '../../build/index.js';


class MyForm extends React.Component {
  render() {
    return <Form
      for={{ name: '' }}
      as="dog"
      authenticityToken={''}
      className="form-horizontal"
      path="/dogs"
      formKey={'DOG_FORM_KEY'}
      >
      <div>Form</div>
    </Form>
  }
}

export default entryPoint(MyForm)
