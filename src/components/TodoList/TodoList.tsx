import { useContext, useEffect } from 'react';
import { getAllTodos } from '../../services/todosAPI.ts';
import { Context } from '../../store/contextProvider.tsx';
import { Todo } from '../';
import { TodoType } from '../../types/types.ts';

export const TodoList = () => {
  const { todos, setTodos, setShowEditModal, setCurrentTodoId } =
    useContext(Context);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = (await getAllTodos()) as TodoType[];
        setTodos(todos);
      } catch (error) {
        console.log(error);
      }
    };
    getTodos();
  }, []);

  const createTodoHandle = () => {
    setShowEditModal(true);
    setCurrentTodoId('');
  };

  return (
    <div>
      <button
        className="fixed top-3 left-1 inline-flex justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 sm:ml-3 sm:w-auto transition-colors duration-200 ease-in-out"
        onClick={createTodoHandle}>
        Create todo
      </button>
      <div className="font-bold pb-2 text-xl text-cyan-500">
        {todos?.length ? 'My todos :' : 'No todos found'}
      </div>

      {todos?.length
        ? todos.map((todo) => (
            <Todo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              description={todo.description}
              createdAt={todo.createdAt}
            />
          ))
        : null}
    </div>
  );
};
