import { useState } from 'react';
import React from 'react';

export const QuestionPrompt = () => {
    const [inputText, setInputText] = useState('')
	const [val, setVal] = useState();
    const handleChange = (e) => {
    setInputText(e.target.value)
	e.preventDefault ()
    }

    return (
    <div className="input-field">
        <label htmlFor="text-input">Ask a question</label>
        <input
        type="text"
        className="text-input"
        value={inputText}
        onChange={handleChange}
        />
		<div>
			<button onClick={() => setVal(() => "")}>clear</button>
		</div>
        <div>My Question: {inputText}</div>
    </div>
    )
}

//add post request for question storage
//example in amy's code - login component
//modify form to show question title and body
//put input field inside form 
//onSubmit handler