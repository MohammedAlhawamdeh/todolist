import React, { Component } from 'react'
import LoginProvider from './Components/auth/context'
import Signup from './Components/auth/signup'
import ToDo from './Components/todo-connected'

export default function App() {
  return (
    <>
      <LoginProvider>
        <ToDo />
        <Signup />
      </LoginProvider>
    </>
  )
}




