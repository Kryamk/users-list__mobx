import React from 'react'
import cl from './Loader.module.css'

export default function Loader(props) {
	return (
		<div {...props} className={cl.loader}></div>
	)
}
