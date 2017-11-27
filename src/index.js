import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import 'isomorphic-fetch';
import badgesApp from './reducers/reducers';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const storeEnhancer = applyMiddleware(thunk);
const store = createStore(badgesApp, storeEnhancer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

registerServiceWorker();
