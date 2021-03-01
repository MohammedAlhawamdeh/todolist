import React from 'react'

const listContext = React.createContext()

const ListProvider = listContext.Provider
const ListConsumer = listContext.Consumer

export { ListProvider, ListConsumer }