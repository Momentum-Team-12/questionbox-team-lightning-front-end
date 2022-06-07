import React from 'react';
import { useState } from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom'

export default function ExistingUserSignIn({ setAuth, isLoggedIn }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = (event) => {
        event.preventDefault()
        setError('')
        axios
            .post('https://questionbox-team-lightning.herokuapp.com/auth/token/login', {
                username: username,
                password: password,
            })
            .then((res) => {
                console.log(res.data)
                setAuth(username.res.data.auth_token)
            })
            .catch((e) => setError(e.message))
    }

    if (isLoggedIn) {
        return <Navigate to="/" replace={true} />
    }

    return (
        <div>
            <h3>Sign in to continue:</h3>
            {error && <div>{error}</div>}
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        required
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Log in</button>
                </div>
            </form>
        </div>
    )
}
