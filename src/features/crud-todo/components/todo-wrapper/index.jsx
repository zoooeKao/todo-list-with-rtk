import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SortTodo} from '../../../../components/sortTodo';
import {addTodo, deleteTodo, getTodoList, updateTodo} from '../../create-thunk-slice';
import {AddTodo} from '../addTodo';

export const TodoWrapper = () => {
  const dispatch = useDispatch();
  const originTodos = useSelector((state) => state.todos.items);
  const [newTodo, setNewTodo] = useState('');
  const [sort, setSort] = useState(false);
  const todos = sort ? [...originTodos].sort((a, b) => a.completed - b.completed) : originTodos;
  const listEndRef = useRef(null);

  useEffect(() => {
    dispatch(getTodoList());
  }, [dispatch]);

  useEffect(() => {
    if (listEndRef.current) {
      listEndRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }, [originTodos.length]);

  const handleToggleComplete = (todo) => {
    dispatch(updateTodo({...todo, completed: todo.completed}));
  };

  const handleEditTodo = ({id, txt}) => {
    const todo = originTodos.find((todo) => todo.id === id);
    if (todo) {
      dispatch(updateTodo({...todo, todo: txt}));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo({todo: newTodo, completed: false}));
      setNewTodo('');
    }
  };

  return (
    <>
      <div className='h-1/2 my-3 py-3 border-b-2 border-solid border-b-sky-600'>
        <ul className='h-full flex flex-col gap-2 overflow-auto'>
          {todos.length > 0 ? (
            todos.map(({id, todo, completed}) => (
              <li key={id}>
                <div className='relative flex items-center px-3 py-2 bg-white border-l-4 border-solid border-t-sky-600 '>
                  <input
                    type='checkbox'
                    checked={completed ? true : false}
                    onChange={(e) => handleToggleComplete({id: id, todo: todo, completed: e.target.checked})}
                    className='accent-blue-primary'
                  />
                  <input
                    type='text'
                    value={todo}
                    onChange={(e) => handleEditTodo({id: id, txt: e.target.value})}
                    className={`w-full p-2 outline-none ${completed ? 'line-through' : ''}`}
                  />
                  <button
                    onClick={() => handleDelete(id)}
                    className='absolute right-3 p-3 text-blue-primary text-lg'>
                    &#215;
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>Nothing to do ...</p>
          )}
          <div ref={listEndRef}></div>
        </ul>
      </div>
      <SortTodo
        checked={sort}
        change={(toggleSort) => setSort(toggleSort)}
      />
      <AddTodo
        value={newTodo}
        changeFn={(newTodo) => setNewTodo(newTodo)}
        clickFn={() => handleAddTodo()}
      />
    </>
  );
};
