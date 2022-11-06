import 'bootstrap/dist/css/bootstrap.min.css';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import FormAdd from '../components/FormAdd';
import Select from '../components/Select/Select';
import UsersList from '../components/UsersList';
import UsersSearch from '../components/UsersSearch';
import useStore from '../hooks/useStore';


export default observer(Users);
function Users() {
	console.log('render Users');

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

	useEffect(() => {
		setCountChecked(getCountChecked())
	}, [users])


	const showModalAdd = () => { setShow(true) }
	const closeModalAdd = () => { setShow(false) }
	const showModalConfirm = () => { setShow2(true) }
	const closeModalConfirm = () => { setShow2(false) }

	const addUser = (user) => {
		add(user)
		closeModalAdd()
	}

	const removeUsers = () => {
		remove()
		setcheckInputAll(false)
		closeModalConfirm()
	};

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



	return (
		<div className="wrapper">

			<header className="header">
				<UsersSearch filter={filter} onChangeQuery={e => setFilter({ ...filter, query: e.target.value })} onChangeSelect={value => setFilter({ ...filter, field: value })} />
				<Button variant="danger" disabled={countChecked === 0 ? true : false} type="button" onClick={showModalConfirm}>Delete</Button>
				<Button variant="primary" onClick={showModalAdd}>+ Add user</Button>
			</header>

			<UsersList
				checkInputAll={checkInputAll}
				checkedUsersAll={checkedUsersAll}
				sort={sort}
				list={list}
				handleCheck={handleCheck}
				loading={loading}
			/>

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
