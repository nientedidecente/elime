/* client/src/index.js */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
/**
 * At the moment you can touch this to test the connection
 */
import openSocket from 'socket.io-client';

let socket = openSocket('http://localhost:5000');
socket.on('battle id', function (id) {
    console.log(`entering battle ${id}`);

});

ReactDOM.render(<App/>, document.getElementById('root'));
