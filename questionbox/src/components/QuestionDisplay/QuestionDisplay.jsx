import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export function QuestionDisplay() {
	const [questions, setQuestions] = useState([]);
	useEffect(() => {
		axios
			.get(`https://questionbox-team-lightning.herokuapp.com/api/questions/`)
			.then((res) => {
				console.log(res.data);
				setQuestions(res.data);
			});
	}, []);
	return (
		<>
			<div className="question-display">
				{questions.map((eachQuestion, index) => {
					return (		
					<h1 key={index}> {eachQuestion.description} </h1>
					)
				})}
			</div>
		</>
	)}