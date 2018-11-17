import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';

/**
 * At the moment you can touch this to test the connection
 */
import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:5000');

ReactDOM.render(<App />, document.getElementById('root'));
