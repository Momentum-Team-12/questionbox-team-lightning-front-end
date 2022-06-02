import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios';
import { DateTime } from 'luxon';

function CommentsDisplay() {
    const [allComments, setAllComments] = useState([])

    useEffect(() => {
        axios
            .get(`https://questionbox-team-lightning.herokuapp.com/api/questions/`)
            .then((res) => {
                console.log(res.data)
                setAllComments(res.data)
            })
    })

    // const timeToConvert = DateTime.fromISO(allComments.created_at)
    // this library returns an object with a set of keys

    return (
        <>
            <div>
                <h1>data goes here!</h1>
                {/* <h1>{timeToConvert.ts}</h1> */}
                <>
                    {allComments.map((eachComment, index) => {
                        const commenterUsername = eachComment.creator
                        const commenterComment = eachComment.description
                        // const commentUpvotes = eachComment.public_repos
                        // const commentFavorites = eachComment.followers
                        const commentCreatedAt = eachComment.created_at
                        // const commentEditedAt = eachComment.updated_at
                        return (
                            <div key={index}>
                                {commenterUsername}
                                {commenterComment}
                                {commentCreatedAt}
                            </div>
                        )
                    })}
                </>
            </div>
            <div>
                <div>
                    {/* <p>asked by {allComments.creator}</p> */}
                    <div>
                        {/* <p>created {allComments.created_at} ago</p> */}
                        {/* <p>updated {allComments.updated_at} ago</p> */}
                    </div>
                </div>
                <div>
                    {/* <p>{allComments.name}</p> */}
                </div>
                <div>
                    {/* <p>{allComments.description}</p> */}
                </div>
                {/* <div>
                    <h1>{allComments.public_repos}</h1> upvotes
                    <h1>{allComments.followers}</h1> stars
                </div> */}
            </div>
        </>
    )

}

export default CommentsDisplay