import React, { useCallback, useContext, useState } from 'react'
import { LoginContext } from './context'
import { If, Then, Else } from 'react-if';


export const Login = () => {
    const context = useContext(LoginContext)
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        context.login(username, password)
    }

    return (
        <>
         <If condition={context.loggedIn}>
         <Then>
             <button onClick={context.logout}>Logout</button>
             </Then>
             <Else>
                 <h3>or Sign in to use it</h3>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" name='username' onChange={(e) => setusername(e.target.value)} />
                <br />
                <label>Password</label>
                <input type="password" name='password' onChange={(e) => setpassword(e.target.value)} />
                <br />
                <input type="submit" value='Login' />
            </form>
             </Else>
         </If>
        </>
    )
}