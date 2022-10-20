import React, { useState } from 'react'
import { Form } from 'react-bootstrap';

export default function FormAdd({ add }) {
	let emptyUser = { 'name': '', 'username': '', 'email': '', 'phone': '', 'zipcode': '', 'checked': false }
	const [user, setUser] = useState(emptyUser)

	const addNewUser = (e) => {
		e.preventDefault();
		add(user)
		setUser(emptyUser)
	}

	return (
		<Form>
			<Form.Control className="mb-3" type="text" placeholder='Name' onChange={(e) => setUser({ ...user, 'name': e.target.value })} />
			<Form.Control className="mb-3" type="text" placeholder='Username' onChange={(e) => setUser({ ...user, 'username': e.target.value })} />
			<Form.Control className="mb-3" type="text" placeholder='Email' onChange={(e) => setUser({ ...user, 'email': e.target.value })} />
			<Form.Control className="mb-3" type="text" placeholder='Phone' onChange={(e) => setUser({ ...user, 'phone': e.target.value })} />
			<Form.Control className="mb-3" type="text" placeholder='Zipcode' onChange={(e) => setUser({ ...user, 'zipcode': e.target.value })} />
			<button className='btn btn-success w-100' type='button' onClick={e => addNewUser(e)}>Add</button>
		</Form>
	)
}
