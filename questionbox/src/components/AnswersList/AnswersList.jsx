import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios';
// import { DateTime } from 'luxon';

function AnswersList() {
    const [allAnswers, setAllAnswers] = useState([])

    useEffect(() => {
        axios
            .get(`https://questionbox-team-lightning.herokuapp.com/api/questions/`)
            .then((res) => {
                console.log(res.data)
                setAllAnswers(res.data)
            })
    }, [])

    // const timeToConvert = DateTime.fromISO(allAnswers.created_at)
    // this library returns an object with a set of keys

    return (
        <>
            <div>
                <p>answersList component:</p>
                <>
                    {allAnswers.map((eachAnswer, index) => {
                        const AnswererUsername = eachAnswer.creator
                        const AnswerDescription = eachAnswer.description
                        const AnswerCreatedAt = eachAnswer.created_at
                        return (
                            <div key={index}>
                                <p>Answerer username: {AnswererUsername}</p>
                                <p>Answer description: {AnswerDescription}</p>
                                <p>Created at: {AnswerCreatedAt}</p>
                            </div>
                        )
                    })}
                </>
            </div>
        </>
    )

}

export default AnswersList