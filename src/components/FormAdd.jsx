import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import MaskedInput from "react-text-mask";


export default function FormAdd({ add }) {
	const phoneNumberMask = [
		"+",
		7,
		" ",
		/[1-9]/,
		/\d/,
		/\d/,
		" ",
		/\d/,
		/\d/,
		/\d/,
		"-",
		/\d/,
		/\d/,
		"-",
		/\d/,
		/\d/
	];
	const formik = useFormik({
		initialValues: {
			name: '',
			username: '',
			email: '',
			phone: '',
			zipcode: '',
			checked: false
		},
		validationSchema: Yup.object({
			name: Yup.string().max(20, 'more 20').required('Name is required'),
			username: Yup.string().matches(/^[a-zA-z0-9]+$/, 'Only latin letters and numbers').min(4, 'more 4'),
			email: Yup.string().email('Enter correctly email'),
			phone: Yup.string(),
			zipcode: Yup.string().matches(/^[0-9-]*$/, 'Only numbers or dash')
		}),
		onSubmit: values => {
			add(values)
			formik.resetForm()
		}
	})


	return (
		<Form onSubmit={formik.handleSubmit}>
			<Form.Group className="mb-3" controlId='formName'>
				<Form.Control
					name="name"
					type="text"
					placeholder='Name*'
					onChange={formik.handleChange}
					value={formik.values.name}
					onBlur={formik.handleBlur}
					isValid={formik.touched.name && !formik.errors.name}
					isInvalid={formik.touched.name && !!formik.errors.name}
				/>
				<Form.Control.Feedback type='invalid'>{formik.errors.name}</Form.Control.Feedback>
			</Form.Group>

			<Form.Group className="mb-3" controlId='formUsername'>
				<Form.Control
					name="username"
					type="text"
					placeholder='Username*'
					onChange={formik.handleChange}
					value={formik.values.username}
					onBlur={formik.handleBlur}
					isValid={formik.touched.username && !formik.errors.username}
					isInvalid={formik.touched.username && !!formik.errors.username}
				/>
				<Form.Control.Feedback type='invalid'>{formik.errors.username}</Form.Control.Feedback>
			</Form.Group>

			<Form.Group className="mb-3" controlId='formEmail'>
				<Form.Control
					name="email"
					type="text"
					placeholder='Email*'
					onChange={formik.handleChange}
					value={formik.values.email}
					onBlur={formik.handleBlur}
					isValid={formik.touched.email && !formik.errors.email}
					isInvalid={formik.touched.email && !!formik.errors.email}
				/>
				<Form.Control.Feedback type='invalid'>{formik.errors.email}</Form.Control.Feedback>
			</Form.Group>


			<Form.Group className="mb-3" controlId='formPhone'>
				<MaskedInput
					name="phone"
					mask={phoneNumberMask}
					value={formik.values.phone}
					placeholder="+7 ___ ___-__-__*"
					type="text"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={
						formik.errors.phone && formik.touched.phone
							? "form-control is-invalid"
							: "form-control"
					}
				/>
				<Form.Control.Feedback type='invalid'>{formik.errors.phone}</Form.Control.Feedback>
			</Form.Group>

			<Form.Group className="mb-3" controlId='formZipcode'>
				<Form.Control
					className="mb-3"
					name="zipcode"
					type="text"
					placeholder='Zipcode'
					onChange={formik.handleChange}
					value={formik.values.zipcode}
					onBlur={formik.handleBlur}
					// isValid={formik.touched.zipcode && !formik.errors.zipcode}
					isInvalid={formik.touched.zipcode && !!formik.errors.zipcode}
				/>
				<Form.Control.Feedback type='invalid'>{formik.errors.zipcode}</Form.Control.Feedback>
			</Form.Group>

			<button className='btn btn-success w-100' type='submit'>Add</button>
		</Form>
	)
}


/*
	<Form.Group className="mb-3" controlId='formPhone'>
		<Form.Control
			className="mb-3"
			name="phone"
			type="text"
			placeholder='Phone*'
			onChange={formik.handleChange}
			value={formik.values.phone}
			onBlur={formik.handleBlur}
			isValid={formik.touched.phone && !formik.errors.phone}
			isInvalid={formik.touched.phone && !!formik.errors.phone}
		/>
		<Form.Control.Feedback type='invalid'>{formik.errors.phone}</Form.Control.Feedback>
	</Form.Group>
 */
