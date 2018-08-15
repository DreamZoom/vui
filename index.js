import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './vui.css';
import './animation.css';

import { HashRouter,Switch,Route } from 'react-router-dom';

import Editor from './src/views/editor';
import UIlist from './src/views/list';

function App() {
	return (
		<Switch>
			<Route exact path="/" component={UIlist} />
			<Route path="/editor/:id" component={Editor} />
		</Switch>
	);
}

ReactDOM.render(
	<HashRouter>
		<App />
	</HashRouter>,
	document.getElementById('root')
);
