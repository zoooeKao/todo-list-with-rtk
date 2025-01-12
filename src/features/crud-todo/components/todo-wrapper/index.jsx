import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SortTodo} from '../../../../components/sortTodo';
import {addTodo, deleteTodo, getTodoList, updateTodo} from '../../create-thunk-slice';
import {AddTodo} from '../addTodo';

/** @typedef {{id: number; todo: string; completed: boolean; userId: number}} OriTodo */

export const TodoWrapper = () => {
  const dispatch = useDispatch();
  const originTodos = /** @type {OriTodo[]} */ (useSelector((state) => state.todos.items));
  const [newTodo, setNewTodo] = useState('');
  const [sort, setSort] = useState(false);
  const [editingTodo, setEditingTodo] = useState({editingId: null, tempEditText: ''});
  const todos = /** @type {OriTodo[]} */ (sort ? [...originTodos].sort((a, b) => a.completed - b.completed) : originTodos);
  const listEndRef = useRef(null);

  useEffect(() => {
    dispatch(getTodoList());
  }, [dispatch]);

  useEffect(() => {
    if (listEndRef.current) {
      listEndRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }, [originTodos.length]);

  /** @param {Object} param0
   * @param {number} param0.id
   * @param {string} param0.completed
   */
  const handleToggleComplete = ({id, completed}) => {
    const findTodo = originTodos.find((oriTodo) => oriTodo.id === id);
    if (findTodo) {
      dispatch(updateTodo({...findTodo, completed: completed}));
    }
  };

  /** @param {Object} param0
   * @param {number} param0.id
   * @param {string} param0.todo
   */
  const handleEditTodo = ({id, todo}) => {
    setEditingTodo({editingId: id, tempEditText: todo});
  };

  /** @param {Object} param0
   * @param {React.KeyboardEvent} e
   * @param {number} id
   */
  const handleKeyDown = async (e, id) => {
    if (e.key === 'Enter') {
      const findTodo = originTodos.find((oriTodo) => oriTodo.id === id);
      if (findTodo) {
        await dispatch(updateTodo({...findTodo, todo: editingTodo.tempEditText}));
        setEditingTodo({editingId: null, tempEditText: ''});
      }
    } else if (e.key === 'Escape') {
      setEditingTodo({editingId: null, tempEditText: ''});
    }
  };

  // 失去焦點時也保存更改
  /** @param {Object} param0
   * @param {number} id
   */
  const handleBlur = async (id) => {
    if (editingTodo.editingId === id) {
      const findTodo = originTodos.find((oriTodo) => oriTodo.id === id);
      if (findTodo) {
        await dispatch(updateTodo({...findTodo, todo: editingTodo.tempEditText}));
        setEditingTodo({editingId: null, tempEditText: ''});
      }
    }
  };

  /** @param {number} id */
  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleAddTodo = () => {
    if (newTodo) {
      dispatch(addTodo({todo: newTodo.trim(), completed: false}));
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
                    checked={completed}
                    onChange={(e) => handleToggleComplete({id: id, completed: e.target.checked})}
                    className='accent-blue-primary'
                  />
                  <input
                    type='text'
                    value={editingTodo.editingId === id ? editingTodo.tempEditText : todo}
                    onClick={() => handleEditTodo({id, todo})} // 記憶要更新的是哪一筆todo
                    onChange={(e) => (editingTodo.editingId === id ? setEditingTodo({editingId: id, tempEditText: e.target.value}) : handleEditTodo({id, todo: e.target.value}))}
                    onKeyDown={(e) => handleKeyDown(e, id)}
                    onBlur={() => handleBlur(id)}
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
