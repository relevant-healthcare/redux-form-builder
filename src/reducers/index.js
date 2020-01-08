import update from 'immutability-helper'
import { SET_FORM_OBJECT, UPDATE_FORM_OBJECT } from '../actions/index'
import reduceRight from 'lodash/reduceRight'

export default function formReducer(state = {}, action) {
  const handlers = {
    [SET_FORM_OBJECT]: () => {
      const { formKey, object } = action
      return update(state, { [formKey]: { $set: object } })
    },
    [UPDATE_FORM_OBJECT]: () => {
      const { formKey, path, value } = action
      const command = reduceRight(
        path,
        (command, component) => { return { [component]: command } },
        { $merge: value }
      )
      return update(state, { [formKey]: command })
    }
  }

  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type]()
  } else {
    return state
  }
}
