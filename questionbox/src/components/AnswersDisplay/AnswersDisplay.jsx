import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios';
// import { DateTime } from 'luxon';

function AnswersDisplay() {
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
                <h1>data goes here!</h1>
                {/* <h1>{timeToConvert.ts}</h1> */}
                <>
                    {allAnswers.map((eachAnswer, index) => {
                        const AnswererUsername = eachAnswer.creator
                        const AnswererAnswer = eachAnswer.description
                        // const AnswerUpvotes = eachAnswer.public_repos
                        // const AnswerFavorites = eachAnswer.followers
                        const AnswerCreatedAt = eachAnswer.created_at
                        // const AnswerEditedAt = eachAnswer.updated_at
                        return (
                            <div key={index}>
                                {AnswererUsername}
                                {AnswererAnswer}
                                {AnswerCreatedAt}
                            </div>
                        )
                    })}
                </>
            </div>
            <div>
                <div>
                    {/* <p>asked by {allAnswers.creator}</p> */}
                    <div>
                        {/* <p>created {allAnswers.created_at} ago</p> */}
                        {/* <p>updated {allAnswers.updated_at} ago</p> */}
                    </div>
                </div>
                <div>
                    {/* <p>{allAnswers.name}</p> */}
                </div>
                <div>
                    {/* <p>{allAnswers.description}</p> */}
                </div>
                {/* <div>
                    <h1>{allAnswers.public_repos}</h1> upvotes
                    <h1>{allAnswers.followers}</h1> stars
                </div> */}
            </div>
        </>
    )

}

export default AnswersDisplay