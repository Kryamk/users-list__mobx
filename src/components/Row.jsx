import React from 'react'
import { observer } from 'mobx-react-lite';


export default observer(Row);
function Row({ handleCheck, id, name, username, email, phone, zipcode, checked }) {
	// console.log('render Row');




	return (
		<tr key={id} style={checked ? {background: 'lightskyblue'} : {}}>
			<td><input type="checkbox" checked={checked} value={id} onChange={handleCheck}></input></td>
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
