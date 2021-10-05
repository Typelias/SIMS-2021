import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactApp from './ReactApp';


function render() {
    ReactDOM.render(
        <ReactApp></ReactApp>
        , document.getElementById('root'));
}

render();