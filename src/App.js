import React, { useEffect, useRef, useState } from 'react'
import Row from './components/Row';
// import About from './pages/About';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import useStore from './hooks/useStore';
import { observer } from 'mobx-react-lite';
import ButtonTable from './components/ButtonTable';
import FormAdd from './components/FormAdd';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { Button, Modal } from 'react-bootstrap';


export default observer(App);
function App() {
	console.log('render App');


	const [show, setShow] = useState(false)
	const handleShow = () => { setShow(true) }
	const handleClose = () => { setShow(false) }


	const [usersStore] = useStore('users');
	let { users, sorted, add, remove } = usersStore;

	const [list, setList] = useState([])
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

	const addUser = (user) => {
		add(user)
		setShow(false)
	}

	const [checkedUsers, setCheckedUsers] = useState([])
	const handleCheck = (e) => {
		let id = +e.target.value;
		if (e.target.checked) {
			setCheckedUsers([...checkedUsers, id])
		}
		else {
			setCheckedUsers(checkedUsers.filter(el => el != id))
		}
	}


	const inputs = useRef([])

	useEffect(() => {
		console.log('---inputs', inputs);
	}, [list])




	const checkedUsersAll = (e) => {
		// let allUsersId;
		// if (e.target.checked) {
		// 	allUsersId = list.map(item => item.id)
		// 	setCheckedUsers(allUsersId)
		// }
		// else {
		// 	setCheckedUsers([])
		// }
		let allChecked = []
		inputs.current.forEach(input => {
			allChecked.push(input.checked)
		})
		console.log('---------',inputs);
		if (allChecked.includes(false)) {
			inputs.current.forEach(input => {
				input.checked = true
				setCheckedUsers([...checkedUsers, +input.value])
			})
		}
		else {
			inputs.current.forEach(input => {
				input.checked = false
			})
			setCheckedUsers([])
		}
	}

	// const changeCheked = (e) = {
	// 	e.target.checked = !e.target.checked;
	// }







	useEffect(() => {
		console.log('---checkedUsers', checkedUsers);
	}, [checkedUsers])

	return (
		<div className="wrapper">

			<button type="button" onClick={() => remove(checkedUsers)}>Delete</button>

			<header className="header">
				<div className="filter">filter</div>
				<Button variant="primary" onClick={handleShow}>+ Add user</Button>
			</header>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title >Add user</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FormAdd add={addUser} />
				</Modal.Body>
			</Modal>

			{/* {items.map((item, i) => (
				<input type='checkbox' value={item} key={i} ref={el => inputs.current[i] = el}/>
			))} */}

			<table className='users-list'>
				<tbody>
					<tr>
						<th><input type="checkbox" onChange={(e) => checkedUsersAll(e)}></input> All</th>
						<th><ButtonTable sortField='id' reverse='false' sorting={(e) => sort(e)}>#</ButtonTable></th>
						<th>Avatar</th>
						<th><ButtonTable sortField='name' reverse='false' sorting={(e) => sort(e)}>Name</ButtonTable></th>
						<th>Username</th>
						<th>Email</th>
						<th>Phone</th>
						<th><ButtonTable sortField='zipcode' reverse='false' sorting={(e) => sort(e)}>zipcode</ButtonTable></th>
					</tr>

					{list.map((item, i = 0) => (
						<Row onRef={el => inputs.current[i] = el} key={item.id} {...item} handleCheck={handleCheck} />
					))}

				</tbody>
			</table>
		</div>
	);
}
