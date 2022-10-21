import React from 'react'

export default function Select({onChange}) {
	const fields = [
		{ value: 'all', name: 'All' },
		{ value: 'name', name: 'Name' },
		{ value: 'username', name: 'Username' },
		{ value: 'email', name: 'Email' },
		{ value: 'phone', name: 'Phone' },
		{ value: 'zipcode', name: 'Zipcode' },
	]
	return (
		<select onChange={e => onChange(e.target.value)}>
			{fields.map(field=>(
				<option key={field.value} value={field.value}>{field.name}</option>
			))}
		</select>
	)
}
