// @ts-check
import LinearProgress, {linearProgressClasses} from '@mui/material/LinearProgress';
import {styled} from '@mui/material/styles';
import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';

const BorderLinearProgress = styled(LinearProgress)(({theme}) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#0284C7',
    ...theme.applyStyles('dark', {
      backgroundColor: '#308fe8',
    }),
  },
}));

export const Progress = () => {
  const todos = useSelector((state) => state.todos.items);
  const totalTodosLength = todos.length;
  const finishedTodosLength = useMemo(() => {
    return todos.filter((todo) => todo.completed).length;
  }, [todos]);

  const finishedRatio = useMemo(() => {
    return totalTodosLength === 0 ? 0 : Math.round((finishedTodosLength / totalTodosLength) * 100);
  }, [finishedTodosLength, totalTodosLength]);

  return (
    <div className='flex items-center pt-4 border-t-2 border-solid border-t-sky-600'>
      <div className='w-2/12 md:w-1/12'>{finishedRatio}%</div>
      <div className='w-10/12 md:w-11/12'>
        <BorderLinearProgress
          variant='determinate'
          value={finishedRatio}
        />
      </div>
    </div>
  );
};
