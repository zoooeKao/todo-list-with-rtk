// @ts-check
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import React from 'react';
import {useSelector} from 'react-redux';
import {styles} from '../../../../styles';
export const AddTodo = ({value, changeFn, clickFn}) => {
  const addingStatus = useSelector((state) => state.todos.status);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        clickFn();
      }}
      className='w-full mt-7'>
      <div className='w-full'>
        <span className='text-blue-primary text-sm'>Add to list</span>
        <div className='flex gap-2 w-full'>
          <input
            type='text'
            value={value}
            onChange={(event) => changeFn(event.target.value)}
            className='flex-grow border p-2 rounded w-5/6'
            autoFocus
            readOnly={addingStatus === 'loading'}
          />
          {addingStatus === 'loading' ? (
            <div className={`${styles.flexCenter} w-1/6`}>
              <CircularProgress size={'20px'} />
            </div>
          ) : (
            <button
              type='submit'
              className='p-3 w-1/6 bg-blue-500 text-white rounded hover:bg-blue-600'>
              &#43;
            </button>
          )}
        </div>
      </div>
    </form>
  );
};
