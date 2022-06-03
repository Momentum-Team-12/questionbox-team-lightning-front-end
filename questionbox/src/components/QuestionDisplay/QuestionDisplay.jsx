import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";


function QuestionDisplay() {
	const [question, setQuestion] = useState([]);
	useEffect(() => {
		axios
			.get(`https://questionbox-team-lightning.herokuapp.com/api/questions/`)
			.then((res) => {
				console.log(res.data);
				setQuestion(res.data);
			});
	}, []);
	return (
		<h1> {question.description} </h1>
	)
}

export default QuestionDisplay