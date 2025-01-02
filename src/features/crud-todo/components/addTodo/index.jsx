// @ts-check
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import React from 'react';
import {useSelector} from 'react-redux';
import {styles} from '../../../../styles';
export const AddTodo = ({value, changeFn, clickFn}) => {
  const addingStatus = useSelector((state) => state.todos.status);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        clickFn();
      }}
      className='absolute bottom-6 right-4 left-4'>
      <div className='w-full'>
        <span className='text-blue-primary text-sm'>Add to list</span>
        <div className='flex gap-2 w-full'>
          <input
            type='text'
            value={value}
            onChange={(e) => changeFn(e.target.value)}
            className='border p-2 rounded w-4/5 md:w-5/6'
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
              className='p-3 w-1/5 md:w-1/6 bg-blue-500 text-white rounded hover:bg-blue-600'>
              &#43;
            </button>
          )}
        </div>
      </div>
    </form>
  );
};
