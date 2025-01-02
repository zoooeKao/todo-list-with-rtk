export const Wrapper = ({children}) => {
  // 設置 position:relative 當作 <AddTodo> 的定位點
  return <div className='relative flex flex-col w-11/12 md:w-3/5 lg:w-1/3 h-2/3 p-4 border-2 border-solid border-white'>{children}</div>;
};
