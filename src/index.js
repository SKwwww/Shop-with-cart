import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import './App.css';
import { Provider } from 'react-redux';
import UserInterface from './App.js';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer.js'
import Modal from 'react-modal';

const store = createStore(reducer, applyMiddleware(thunk));

Modal.setAppElement('#user-interface')

const appElement = document.getElementById('user-interface');

ReactDOM.render(
  <Provider store={store}>
    <UserInterface />
  </Provider>,
  appElement
);


