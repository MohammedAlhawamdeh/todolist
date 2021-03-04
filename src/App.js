import React from 'react'
import LoginProvider from './Components/auth/context'
import { Login } from './Components/auth/login'
import Signup from './Components/auth/signup'
import ToDo from './Components/todo-connected'

export default function App() {
  return (
    <>
      <LoginProvider>
        <ToDo />
        <Signup />
        <br />
        <Login />
      </LoginProvider>
    </>
  )
}




