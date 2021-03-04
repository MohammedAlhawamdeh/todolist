import React, { useContext, useState } from 'react';
import { ListContext } from '../context/listContext'


export default function TodoList(props) {
  const context = useContext(ListContext)

  const [currentPage, setCurrentPage] = useState(1)
  const [todosPerPage, setTodosPerPage] = useState(3)
  const pageNumbers = []
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

  let currentTodos = context.list.slice(indexOfFirstTodo, indexOfLastTodo)
  for (let i = 1; i <= Math.ceil(context.list.length / todosPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul>
        {currentTodos.map(item => (
          <li
            className={`complete-${item.complete.toString()}`}
            key={item._id}
          >
            <span onClick={() => context._toggleComplete(item._id)}>
              {item.text}
            </span>
            <small>{item.difficulty}</small>
            <button onClick={() => context._deleteItems(item)}>X</button>
          </li>
        ))}
        {
          pageNumbers.map(number => {
            return (
              <button
                key={number}
                id={number}
                onClick={(event) => { setCurrentPage(Number(event.target.id)) }}
              >
                {number}
              </button>
            );
          })
        }
      </ul>
      <button onClick={() => context._hideItems()}>Hide Completed Items</button>
      <button onClick={() => context._showItems()}>Show All Items</button>
      <button onClick={() => context.sorted()}>Sort By Difficulty</button>
    </div>
  )
}

