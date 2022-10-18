import React from 'react'
import { observer } from 'mobx-react-lite';


export default observer(Row);
function Row({ id, name, num, username, email, phone, zipcode }) {
	// console.log('---',name);
	return (
		<tr key={id}>
			<td>{id}</td>
			<td><span className='users-list__avatar'>{name[0]}</span></td>
			<td>{name}</td>
			<td>{username}</td>
			<td>{email}</td>
			<td>{phone}</td>
			<td>{zipcode}</td>
		</tr>
	)
}
