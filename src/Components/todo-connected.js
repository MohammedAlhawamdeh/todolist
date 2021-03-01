import React, { useState, useEffect } from 'react';
// import { ListProvider } from '../context/listContext.js';
import useAjax from '../custom-hooks/useAjax.js';
import TodoForm from './form.js';

import './todo.scss';

const ToDo = () => {
  const [_addItem, _toggleComplete, _getTodoItems, _deleteItems, _hideItems, sorted, list] = useAjax()
  useEffect(_getTodoItems, []);

  const [currentPage, setCurrentPage] = useState(1)
  const [todosPerPage, setTodosPerPage] = useState(3)
  const pageNumbers = []
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

  let currentTodos = list.slice(indexOfFirstTodo, indexOfLastTodo)
  for (let i = 1; i <= Math.ceil(list.length / todosPerPage); i++) {
    pageNumbers.push(i);
  }


  return (
    <>
      <header>
        <h2>
          There are {list.filter(item => !item.complete).length} Items To Complete
        </h2>
      </header>

      <section className="todo">

        <div>
          <TodoForm handleSubmit={_addItem} />
        </div>

        <div>
          <ul>
            {currentTodos.map(item => (
              <li
                className={`complete-${item.complete.toString()}`}
                key={item._id}
              >
                <span onClick={() => _toggleComplete(item._id)}>
                  {item.text}
                </span>
                <small>{item.difficulty}</small>
                <button onClick={() => _deleteItems(item)}>X</button>
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
            <button onClick={_hideItems}>hide</button>
            <button onClick={sorted}>Sort By Difficulty</button>
          </ul>
        </div>
      </section>
    </>
  );
};

export default ToDo;
