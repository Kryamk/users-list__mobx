import React, { useEffect, useState } from 'react'
import Row from './components/Row';
// import About from './pages/About';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import useStore from './hooks/useStore';
import { observer } from 'mobx-react-lite';
import ButtonTable from './components/ButtonTable';


export default observer(App);
function App() {
	console.log('render App');

	const [list, setList] = useState([])

	const [usersStore] = useStore('users');
	let { users, sorted } = usersStore;

	useEffect(() => {
		setList(users)
	}, [users])

	const sort = (e) => {
		let field = e.target.dataset.sort
		let reverse = e.target.dataset.reverse
		if (reverse === 'true') {
			e.target.dataset.reverse = 'false'
		}
		else {
			e.target.dataset.reverse = 'true'
		}
		let sortList = sorted(field, reverse)
		setList(sortList)
	}


	return (
		<div className="wrapper">

			<table className='users-list'>
				<tbody>
					<tr>
						<th><ButtonTable sortField='id' reverse='false' sorting={(e)=>sort(e)}>#</ButtonTable></th>
						<th>Avatar</th>
						<th><ButtonTable sortField='name' reverse='false' sorting={(e)=>sort(e)}>Name</ButtonTable></th>
						<th>Username</th>
						<th>Email</th>
						<th>Phone</th>
						<th><ButtonTable sortField='zipcode' reverse='false' sorting={(e)=>sort(e)}>zipcode</ButtonTable></th>
					</tr>

					{list.map((pr, i = 0) => (
						<Row key={pr.id} {...pr} num={i + 1} />
					))}

				</tbody>
			</table>
		</div>
	);
}
