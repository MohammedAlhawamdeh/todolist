import React, { useEffect } from 'react';
import { ListProvider } from '../context/listContext.js';
import useAjax from '../custom-hooks/useAjax.js';
import TodoForm from './form.js';
import TodoList from './list.js';
import Auth from './auth/auth'


import './todo.scss';

const ToDo = () => {
  const [_addItem, _toggleComplete, _getTodoItems, _deleteItems, _hideItems, _showItems, sorted, list] = useAjax()
  useEffect(_getTodoItems, []);
  const state = {
    _addItem,
    _toggleComplete,
    _getTodoItems,
    _deleteItems,
    _hideItems,
    _showItems,
    sorted,
    list
  }
  return (
    <>
      <ListProvider value={state}>
      <Auth capability="read">
        <header>
          <h2>
            There are {list.filter(item => !item.complete).length} Items To Complete
        </h2>
        </header>
        </Auth>
        <section className="todo">
        <Auth capability="create">
          <div>
            <TodoForm handleSubmit={_addItem} />
          </div>
          </Auth>
          <Auth capability = "read">
          <TodoList />
          </Auth>
        </section>
      </ListProvider>
    </>
  )
}
export default ToDo
