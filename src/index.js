import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import badgesApp from './reducers/reducers'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const store = createStore(badgesApp, {});
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

registerServiceWorker();
