import { useState } from 'react'

export default (cb) => {

    const [item, setItem] = useState({})
    const handleInputChange = e => {
        setItem({ ...item, [e.target.name]: e.target.value })
    }
    const handleSubmit = e => {
        e.preventDefault();
        e.target.reset();
        cb(item)
        const emptyItem = {}
        setItem({ emptyItem })
    }
    return [handleInputChange, handleSubmit, item]
}
