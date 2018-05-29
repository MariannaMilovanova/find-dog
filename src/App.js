import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './components/home/home'
import logger from 'redux-logger';
import reducers from './reducers';
import promise from 'redux-promise';
import './styles/style.css'

const createStoreWithMiddleware = applyMiddleware(promise, logger)(createStore);

export default () => (
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
        <Switch>
          <Route path="/" component={HomePage}/>
        </Switch>
    </BrowserRouter>
  </Provider>
);