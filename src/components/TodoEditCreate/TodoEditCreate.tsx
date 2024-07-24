import { useContext, useEffect, useState } from 'react';
import {
  createTodo,
  getAllTodos,
  updateTodo,
} from '../../services/todosAPI.ts';
import { TodoType } from '../../types/types.ts';
import { Context } from '../../store/contextProvider.tsx';

export const TodoEditCreate = () => {
  const {
    todos,
    setTodos,
    showEditModal,
    setShowEditModal,
    currentTodoId,
    setCurrentTodoId,
    setIsLoading,
    isLoading,
  } = useContext(Context);

  let todo: TodoType | undefined;

  if (currentTodoId) {
    todo = todos.find((todo) => todo.id === currentTodoId);
  }
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdAt, setCreatedAt] = useState(
    new Date().toISOString().slice(0, 10),
  );

  useEffect(() => {
    setTitle(todo?.title || '');
    setDescription(todo?.description || '');
    setCreatedAt(
      todo?.createdAt
        ? new Date(todo.createdAt).toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10),
    );
  }, [todo]);

  const addTodoHandler = async () => {
    setIsLoading(true);
    try {
      await createTodo({
        title,
        description,
        createdAt,
      });
      const todos = (await getAllTodos()) as TodoType[];
      setTodos(todos);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setShowEditModal(false);
    }
  };

  const changeTodoHandler = async () => {
    setIsLoading(true);
    try {
      await updateTodo({
        id: currentTodoId,
        title,
        description,
        createdAt,
      });
      const todos = (await getAllTodos()) as TodoType[];
      setTodos(todos);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setShowEditModal(false);
      setCurrentTodoId('');
    }
  };

  return (
    <>
      {showEditModal && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity"
            aria-hidden="true"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
                <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name">
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="email">
                      Description
                    </label>
                    <input
                      type="text"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="message">
                      Created at
                    </label>
                    <input
                      type="date"
                      placeholder="Enter your message"
                      value={createdAt}
                      onChange={(e) => {
                        setCreatedAt(e.target.value);
                      }}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline bg-greem bg-gray-200"></input>
                  </div>

                  <div className="flex items-center justify-end">
                    <button
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto transition-colors duration-200 ease-in-out"
                      onClick={() => {
                        setShowEditModal(false);
                        setCurrentTodoId('');
                      }}>
                      Cancel
                    </button>
                    <button
                      className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 sm:ml-3 sm:max-w-24 transition-colors duration-200 ease-in-out"
                      onClick={
                        currentTodoId ? changeTodoHandler : addTodoHandler
                      }>
                      {currentTodoId && isLoading
                        ? 'Updating...'
                        : currentTodoId && !isLoading
                          ? 'Update'
                          : !currentTodoId && isLoading
                            ? 'Creating...'
                            : 'Create'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
