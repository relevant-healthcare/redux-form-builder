import Form from './components/form'
import formsReducer from './reducers'
import {
  HiddenControl,
  LabeledControl,
  UnlabeledControl
} from './components/control'
import Field from './components/field'
import Fields from './components/fields'
import {
  CheckboxInput,
  DateInput,
  HiddenInput,
  RadioButtonGroupInput,
  SelectInput,
  TextAreaInput,
  TextInput
} from './components/input'
import formScopedStateWrapper from './containers/form_scoped_state_wrapper'
import {
  setFormObject,
  SET_FORM_OBJECT,
  updateFormObject,
  UPDATE_FORM_OBJECT
} from './actions/index'

export default Form
export {
  CheckboxInput,
  DateInput,
  Field,
  Fields,
  formsReducer,
  formScopedStateWrapper,
  HiddenControl,
  HiddenInput,
  LabeledControl,
  RadioButtonGroupInput,
  SelectInput,
  setFormObject,
  SET_FORM_OBJECT,
  TextAreaInput,
  TextInput,
  UnlabeledControl,
  updateFormObject,
  UPDATE_FORM_OBJECT
}
