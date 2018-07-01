import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { DatePicker } from 'antd';


import Editor from './src/views/editor';

function App() {
  return (
    <Editor />
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
