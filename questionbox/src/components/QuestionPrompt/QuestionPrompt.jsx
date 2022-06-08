import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export const QuestionPrompt = () => {
    const [values, setValues] = useState({
		title: '',
		body: '',
	});

    const handleTitleChange = (e) => {
    setValues({...values, title: e.target.value});
    };

	const handleBodyChange = (e) => {
	setValues({...values, body: e.target.value});
	};

	const token = localStorage.getItem('auth_token')
	console.log(token)
	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(e)
		axios
			.post('https://questionbox-team-lightning.herokuapp.com/api/questions/', {
				title: values.title,
				body: values.body,
	},
	{
		headers: { Authorization: `token ${token}`,
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
	}
)
.then((res) => {
	console.log(res.data)
})
};

    return (
	<form onSubmit={handleSubmit}>
		<div className="input-field">
			<label htmlFor="text-input">Question Title</label>
			<input
			type="text"
			className="text-input"
			values={values.title}
			onChange={handleTitleChange}
			/>

			<label htmlFor="text-area">Question Text</label>
			<input
			type="text"
			className="text-area"
			values={values.body}
			onChange={handleBodyChange}
			/>
		</div>
		<div>
			<button type="submit">Submit</button>
		</div>
	</form>
    )
}

//add post request for question storage
//example in amy's code - login component
//modify form to show question title and body
//put input field inside form 
//onSubmit handler