import React, { useContext } from 'react'
import { LoginContext } from './context'

function Signup() {
    const context = useContext(LoginContext)
    const handleSubmit = (e) => {
        e.preventDefault()
        let username = e.target.username.value
        let password = e.target.password.value
        let email = e.target.email.value
        let role = e.target.role.value

        let state = {
            username,
            password,
            email,
            role
        }
        context.signup(state)
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" name='username' />
                <br />
                <label>Password</label>
                <input type="password" name='password' />
                <br />
                <label>Email</label>
                <input type="email" name='email' />
                <br />
                <label>Role</label>
                <select name="role" >
                    <option>admin</option>
                    <option>editor</option>
                    <option>user</option>
                </select>
                <input type="submit" />
            </form>
        </>
    )
}

export default Signup
