import React from 'react'
import update from 'react/lib/update'
import formContextWrapper from './form_context_wrapper'
import _ from 'lodash'
import { updateFormObject } from '../actions/index'
import { connect } from 'react-redux'

export default function(mapScopedStateToProps) {
  return function(component) {
    const ConnectedComponent = connect(
      ({ forms }, props) => {
        const { baseLocalPath, formKey } = props
        const formObject = forms[formKey]
        if (!formObject) {
          return {}
        }
        const scopedFormObject = _.isEmpty(baseLocalPath) ? formObject : _.get(formObject, baseLocalPath)
        return mapScopedStateToProps(scopedFormObject, props)
      },
      (dispatch, { baseLocalPath, formKey }) => {
        return {
          onChange: (value) => {
            dispatch(updateFormObject(formKey, baseLocalPath, value))
          }
        }
      }
    )(component)

    return formContextWrapper(
      ({ baseLocalPath, formKey }) => { return { baseLocalPath, formKey } }
    )(ConnectedComponent)
  }
}
