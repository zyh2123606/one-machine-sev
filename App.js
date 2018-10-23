import React, { Component } from 'react'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import * as Reducers from './src/reducers'
import RouterView from './src/router'

const reducer = combineReducers({
  ...Reducers
})
const finalCreateStore = compose(applyMiddleware(thunkMiddleware))(createStore)
const store = finalCreateStore(reducer)

export default class App extends Component{
  render(){
    return (
      <Provider store={store}>
        <RouterView />
      </Provider>
    )
  }
}