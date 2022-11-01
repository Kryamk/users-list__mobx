import React, { useEffect, useRef, useState } from 'react'
import Row from './components/Row';
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


export default observer(App);
function App() {
	console.log('render App');

	const [list, setList] = useState([])
	const [filter, setFilter] = useState({ field: 'all', query: '' })
	const [show, setShow] = useState(false)
	const [show2, setShow2] = useState(false)
	const [countChecked, setCountChecked] = useState(0)
	const [checkInputAll, setcheckInputAll] = useState(false)
	const [usersStore] = useStore('users');
	const { users, loading, sorted, add, remove, changeChecked, changeCheckedAll, getCountChecked, search } = usersStore;


	useEffect(() => {
		let filterUsers = search(filter)
		setList(filterUsers)
	}, [users, filter.field, filter.query])

	const addUser = (user) => {
		add(user)
		closeModalAdd()
	}

	const removeUsers = () => {
		remove()
		setcheckInputAll(false)
		closeModalConfirm()
	};

	const showModalAdd = () => { setShow(true) }
	const closeModalAdd = () => { setShow(false) }

	const showModalConfirm = () => { setShow2(true) }
	const closeModalConfirm = () => { setShow2(false) }

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

	const handleCheck = (e) => {
		changeChecked(+e.target.value, e.target.checked)
		setCountChecked(getCountChecked())
	}

	const checkedUsersAll = (e) => {
		changeCheckedAll(list, e.target.checked)
		setcheckInputAll(e.target.checked)
		setCountChecked(getCountChecked())
	}

	const enterQuery = (e) => {
		setFilter({ ...filter, query: e.target.value })
	}

	return (
		<div className="wrapper">

			<header className="header">
				<div className="filter">
					<Select onChange={selectedSort => setFilter({ ...filter, field: selectedSort })} />
					<input type="text" value={filter.query} onChange={enterQuery} placeholder='Search' />
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
			{loading && <Loader style={{ margin: '30px auto' }} />}
			{list.length === 0 && !loading && <h2>Users not found</h2>}


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
