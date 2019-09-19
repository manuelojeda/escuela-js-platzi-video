import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router } from 'react-router';
import initialState from '../initialState'
import { createBrowserHistory } from 'history';
import reducer from '../reducers';

const store = createStore(reducer, initialState, compose(applyMiddleware(thunk)))
const history = createBrowserHistory();

const ProviderMock = (props) => (
  <Provider store={store}>
      <Router history={history}>
        {props.children}
      </Router>
  </Provider>
)

export default ProviderMock
