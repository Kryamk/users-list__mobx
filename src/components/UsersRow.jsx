import React from 'react'
// import { observer } from 'mobx-react-lite';



const UsersRow = ({ handleCheck, id, name, username, email, phone, zipcode, checked }) => {
	return (
		<tr key={id} style={checked ? { background: 'lightskyblue' } : {}}>
			<td><input className='checked-input' type="checkbox" checked={checked} value={id} onChange={handleCheck}></input></td>
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
export default UsersRow;
// export default observer(UsersRow);
