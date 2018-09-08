import update from 'react/lib/update'
import { SET_FORM_OBJECT, UPDATE_FORM_OBJECT } from '../actions/index'
import _ from 'lodash'

export default function formReducer(state = {}, action) {
  console.log(action)
  console.log(state)
  const handlers = {
    [SET_FORM_OBJECT]: () => {
      const { formKey, object } = action
      return update(state, { [formKey]: { $set: object } })
    },
    [UPDATE_FORM_OBJECT]: () => {
      const { formKey, path, value } = action
      const command = _.reduceRight(
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
