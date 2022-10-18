import React, { useContext } from 'react'
import { StoreContext } from './../context';

export default function(...list) {
	const stores = useContext(StoreContext)
	return list.map(name=> stores[name])
}
