import React from 'react'
import Select from './Select/Select'

export default function UsersSearch({ filter, onChangeQuery, onChangeSelect }) {
	return (
		<div className="filter">
			<Select onChange={onChangeSelect} />
			<input type="text" value={filter.query} onChange={onChangeQuery} placeholder='Search' />
		</div>
	)
}
