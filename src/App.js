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
import Select from './components/UI/Select/Select';
import Loader from './components/UI/Loader/Loader';
// import { Button, Modal } from 'react-bootstrap';


export default observer(App);
function App() {
	console.log('render App');

	const [usersStore] = useStore('users');
	let { users, loading, sorted, add, remove, changeChecked, changeCheckedAll, getCountChecked, search } = usersStore;


	const [show, setShow] = useState(false)
	const showModalAdd = () => { setShow(true) }
	const closeModalAdd = () => { setShow(false) }

	const [show2, setShow2] = useState(false)
	const showModalConfirm = () => { setShow2(true) }
	const closeModalConfirm = () => { setShow2(false) }

	const [countChecked, setCountChecked] = useState(0)
	useEffect(() => {
		setCountChecked(getCountChecked())
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
		sorted(field, reverse)
	}

	const [checkInputAll, setcheckInputAll] = useState(false)
	const handleCheck = (e) => {
		changeChecked(+e.target.value, e.target.checked)
		setCountChecked(getCountChecked())
	}
	const checkedUsersAll = (e) => {
		changeCheckedAll(e.target.checked)
		setcheckInputAll(e.target.checked)
		setCountChecked(getCountChecked())
	}


	const addUser = (user) => {
		add(user)
		closeModalAdd()
	}
	const removeUsers = () => {
		remove()
		setcheckInputAll(false)
		closeModalConfirm()
	};


	const [list, setList] = useState([])

	useEffect(() => {
		setList(users)
	}, [users])



	const [filter, setFilter] = useState({ field: 'all' })
	const enterQuery = (e) => {
		// setFilter({...filter, query: e.target.value})
		// console.log('---',e.target.value);
		let filterUsers = search({ ...filter, query: e.target.value })
		setList(filterUsers)
	}





	// useEffect(() => {
	// 	// console.log('---',list);
	// 	// let obj = list[0]
	// 	// if (obj) console.log('---list', obj.checked);
	// }, [users])

	return (
		<div className="wrapper">




			<header className="header">
				<div className="filter">
					<Select onChange={selectedSort => setFilter({ ...filter, field: selectedSort })} />
					<input type="text" onChange={enterQuery} placeholder='Search' />
				</div>
				<Button variant="danger" disabled={countChecked === 0 ? true : false} type="button" onClick={showModalConfirm}>Delete</Button>
				<Button variant="primary" onClick={showModalAdd}>+ Add user</Button>
			</header>



			<table className='users-list'>
				<tbody>
					<tr>
						<th><input checked={checkInputAll} type="checkbox" onChange={(e) => checkedUsersAll(e)}></input> All</th>
						<th><ButtonTable sortField='id' reverse='false' sorting={(e) => sort(e)}>#</ButtonTable></th>
						<th>Avatar</th>
						<th><ButtonTable sortField='name' reverse='false' sorting={(e) => sort(e)}>Name</ButtonTable></th>
						<th>Username</th>
						<th>Email</th>
						<th>Phone</th>
						<th><ButtonTable sortField='zipcode' reverse='false' sorting={(e) => sort(e)}>zipcode</ButtonTable></th>
					</tr>



					{list.map((item, i = 0) => (
						<Row key={item.id} {...item} handleCheck={handleCheck} />
					))}


				</tbody>
			</table>
			{loading && <Loader style={{margin: '30px auto'}} />}
			{list.length === 0 && !loading && <h2>Users not found</h2> }


			<Modal show={show} onHide={closeModalAdd}>
				<Modal.Header closeButton>
					<Modal.Title >Add user</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FormAdd add={addUser} />
				</Modal.Body>
			</Modal>

			<Modal show={show2} onHide={closeModalConfirm}>
				<Modal.Header closeButton>
					<Modal.Title >Deleted users</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Are you sure you want to delete the selected {countChecked} users?
				</Modal.Body>
				<Modal.Footer>
					<Button variant='success' type="button" onClick={removeUsers}>Delete</Button>
					<Button variant='secondary' type="button" onClick={closeModalConfirm}>Cancel</Button>
				</Modal.Footer>
			</Modal>
		</div >
	);
}
