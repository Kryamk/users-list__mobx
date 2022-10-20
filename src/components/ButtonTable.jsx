import React from 'react'
import { Button } from 'react-bootstrap'

export default function ButtonTable({children, sortField, sorting, reverse}) {
	return (
		<Button
			variant='info'
			type='button'
			data-sort={sortField}
			data-reverse={reverse}
			onClick={(e)=>sorting(e)}>{children}
		</Button>

	)
}
