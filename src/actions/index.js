export const SET_FORM_OBJECT = 'SET_FORM_OBJECT'
export function setFormObject(formKey, object) {
  return {
    type: SET_FORM_OBJECT,
    formKey,
    object
  }
}

export const UPDATE_FORM_OBJECT = 'UPDATE_FORM_OBJECT'
export function updateFormObject(formKey, path, value) {
  return {
    type: UPDATE_FORM_OBJECT,
    formKey,
    path,
    value
  }
}
