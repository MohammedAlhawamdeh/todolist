import { useState } from 'react'
import axios from 'axios'

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo'
export default () => {
    const [list, setList] = useState([])
    const _addItem = (item) => {
        item.due = new Date()
        axios.post(todoAPI, JSON.stringify(item), {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(data => {
                setList([...list, data.data])

            })
    }
    const _toggleComplete = id => {
        let item = list.filter(i => i._id === id)[0] || {};
        if (item._id) {
            item.complete = !item.complete;
            let url = `${todoAPI}/${id}`;
            axios.put(url, JSON.stringify(item), {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(data => {
                    setList(list.map((listItem) => listItem._id === item._id ? data.data : listItem))
                })
        }
    }
    const _getTodoItems = async () => {
        let rawData = await axios.get(todoAPI)
        let data = rawData.data.results
        setList(data)
    }
    const _deleteItems = async item => {
        let url = `${todoAPI}/${item._id}`
        let deletedItem = await axios.delete(url)
        setList(list.filter((listItem) => listItem._id === deletedItem.data._id ? '' : listItem))
    }
    const _hideItems = () => {
        setList(list.filter(listItem => (
            listItem.complete === false
        )))
    }
    const sorted = () => {
        setList(list.sort((a, b) => {
            return b.difficulty - a.difficulty
        }))


    }
    return [_addItem, _toggleComplete, _getTodoItems, _deleteItems, _hideItems, sorted, list]
}