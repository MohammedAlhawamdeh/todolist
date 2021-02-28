import React, { useEffect, useState } from 'react';
import useAjax from '../custom-hooks/useAjax.js';
import TodoForm from './form.js';
import TodoList from './list.js';

import './todo.scss';

const ToDo = () => {
  const [_addItem, _toggleComplete, _getTodoItems, _deleteItems, list] = useAjax()
  useEffect(_getTodoItems, []);
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
          <TodoList
            list={list}
            handleComplete={_toggleComplete}
            handleDelete={_deleteItems}
          />
        </div>
      </section>
    </>
  );
};

export default ToDo;
