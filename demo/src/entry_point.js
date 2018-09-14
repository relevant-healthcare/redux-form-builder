import React from 'react'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { formsReducer } from '../../build/index'
import _ from 'lodash'

class EntryPoint extends React.Component {
  get store() {
    const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    if (!this._store) {
      this._store = createStore(
        combineReducers({ forms: formsReducer }),
        composeEnhancers(applyMiddleware(thunk))
      )
    }
    return this._store
  }

  render() {
    return <Provider store={this.store}>{ this.props.children }</Provider>
  }
}

export default function(component) {
  const WrappedComponent = component;

  return (props) => {
    return <EntryPoint>
      <WrappedComponent { ...props } />
    </EntryPoint>
  }
}
