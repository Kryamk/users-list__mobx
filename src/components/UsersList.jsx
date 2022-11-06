import React from 'react'
import ButtonTable from './ButtonTable'
import Loader from './Loader/Loader'
import UsersRow from './UsersRow'

export default function UsersList({ checkInputAll, checkedUsersAll, sort, list, handleCheck, loading }) {
	return (
		<>
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
						<UsersRow key={item.id} {...item} handleCheck={handleCheck} />
					))}


				</tbody>
			</table>
			{loading && <Loader style={{ margin: '30px auto' }} />}
			{list.length === 0 && !loading && <h2>Users not found</h2>}
		</>
	)
}
