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

// uncontrolled forms
// export const RefInput = () => {
//     const inputText = useRef('')

//     const handleClick = () => {
//     console.log(inputText)
//     console.log(inputText.current)
//     console.log(inputText.current.value)
//     }

//     return (
//     <>
//         <input type="text" className="ref-input-field" ref={inputText} />
//         <button className="btn-input" onClick={handleClick}>
//         Check that Ref!
//         </button>
//     </>
//     )
// }