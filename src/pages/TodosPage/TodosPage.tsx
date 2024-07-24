import { TodoDelete, TodoEditCreate, TodoList, Web3 } from '../../components';

export const TodosPage = () => {
  return (
    <>
      <TodoList />
      <TodoEditCreate />
      <TodoDelete />
      <Web3 />
    </>
  );
};
