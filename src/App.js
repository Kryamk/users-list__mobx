import 'bootstrap/dist/css/bootstrap.min.css';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Users from './pages/Users';
import './style.css';


export default observer(App);
function App() {
	console.log('render App');


	return (
		<div className="wrapper">
			<header className="header">
				<h1>User list!</h1>
			</header>
			<Users />
		</div >
	);
}
