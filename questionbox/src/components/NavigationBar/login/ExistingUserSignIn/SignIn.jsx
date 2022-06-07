import { useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

export default function SignIn({ setAuth, isLoggedIn }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = (event) => {
        // prevent the default action of the form, which is to make a request
        event.preventDefault()
        console.log(event)
        // clear errors since we could be re-submitting form data
        setError('')
        // Make an ajax request to the backend's URL for login
        // Use the username and password from state to send in the request body
        axios
            .post('https://questionbox-team-lightning.herokuapp.com/auth/token/login', {
                username: username,
                password: password,
            })
            .then((res) => {
                console.log(res.data)
                setAuth(username, res.data.auth_token)
            })
            .catch((e) => setError(e.message))
    }

    if (isLoggedIn) {
        return <Navigate to="/" replace={true} />
    }

    return (
        <div className="Login">
            <h2>Log In</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleLogin}>
                <div className="field-controls">
                    <label className="input-label" htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="field-controls">
                    <label className="input-label" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="field-controls">
                    <button type="submit">Log in</button>
                </div>
            </form>
        </div>
    )
}