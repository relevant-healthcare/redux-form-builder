import React from 'react';
import entryPoint from './entry_point'
import Form, {
  CheckboxInput,
  DateInput,
  Field,
  Fields,
  HiddenControl,
  HiddenInput,
  LabeledControl,
  RadioButtonGroupInput,
  SelectInput,
  TextAreaInput,
  TextInput,
  UnlabeledControl }
from '../../build/index';
import Greeter from './greeter'
import ClearNameButton from './clear_name_button'
import NestedFields from './nested_fields'

class MyForm extends React.Component {
  render() {
    const initialState = {
      owner: {
        name: '',
        address: '',
        birthdate: '',
        secret: true,
        glasses: false,
        gender: 'male',
        plan: 'free',
        notes: '',
        agencies: [
           { name: 'Some Agency' }
        ]
      }
    }

    return <Form
      for={initialState}
      as="dog"
      authenticityToken={''}
      className="form-horizontal"
      path="/dogs"
      formKey={'DOG_FORM_KEY'}
      onSubmit={this.props.onSubmit}
      >
      <h2>Owner Info</h2>
      <Fields for="owner">
        <div>
          <Field for="name"/>
          <Field
            for="address"
            label="Address"
            input={TextInput}/>
          <Field
            for="birthdate"
            control={LabeledControl}
            label="Birth Date"
            input={DateInput}/>
          <Field
            for="secret"
            control={HiddenControl}
            input={HiddenInput}/>
          <Field
            for="glasses"
            input={CheckboxInput}/>
          <Field
            for="gender"
            input={SelectInput}
            inputProps={{
              options: [
                { name: "Male", value: "male" },
                { name: "Female", value: "female" },
                { name: "Other", value: "other" }]}}/>
          <Field
            for="plan"
            input={RadioButtonGroupInput}
            inputProps={{
              options: [
                { name: "Free", value: "free" },
                { name: "Basic", value: "basic"},
                { name: "Premium", value: "premium"}]}}/>
          <Field
            for="notes"
            control={UnlabeledControl}
            input={TextAreaInput}/>
          <NestedFields />
          <Greeter/>

          <ClearNameButton/>
        </div>
      </Fields>
      <div>
        <input
          id="save-form-input"
          type="submit"
          value="Save"/>
      </div>
    </Form>
  }
}

export default entryPoint(MyForm)
