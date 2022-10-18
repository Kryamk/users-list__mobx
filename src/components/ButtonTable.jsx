import React from 'react'

export default function ButtonTable({children, sortField, sorting, reverse}) {
	return (
		<button
			className='btn btn-primary'
			type='button'
			data-sort={sortField}
			data-reverse={reverse}
			onClick={(e)=>sorting(e)}>{children}
		</button>

	)
}
