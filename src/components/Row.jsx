import React from 'react'
import { observer } from 'mobx-react-lite';


export default observer(Row);
function Row({ handleCheck, id, name, username, email, phone, zipcode, onRef }) {
	// console.log('render Row');




	return (
		<tr key={id}>
			<td><input ref={onRef} type="checkbox" value={id} onChange={handleCheck}></input></td>
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
