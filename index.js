import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './vui.css';
import './animation.css';

import DemoApp from './demo/DemoApp';

function App() {
	return <DemoApp />;
}

ReactDOM.render(<App />, document.getElementById('root'));
