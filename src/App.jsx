// @ts-check
// import '@fontsource/roboto'; // 預設權重 400
import React from 'react';
import {Center} from './components/center';
import {Progress} from './components/progress';
import {Title} from './components/title';
import {Wrapper} from './components/wrapper';
import {TodoWrapper} from './features/crud-todo/components/todo-wrapper';

export const App = () => {
  return (
    <div className={`h-dvh bg-gradient-to-b from-blue-200 to-indigo-300 text-blue-primary`}>
      <Center>
        <Wrapper>
          <Title />
          <Progress />
          <TodoWrapper />
        </Wrapper>
      </Center>
    </div>
  );
};
