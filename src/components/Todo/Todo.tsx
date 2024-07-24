import { useContext } from 'react';
import { Context } from '../../store/contextProvider.tsx';
import { TodoType } from '../../types/types.ts';

export const Todo = (todo: TodoType) => {
  const { id, title, description, createdAt } = todo;
  const {
    setShowDeleteModal,
    setCurrentTodoId,
    setShowEditModal,
    currentTodoId,
  } = useContext(Context);
  const showDeleteModalHandle = () => {
    setShowDeleteModal(true);
    setCurrentTodoId(id);
  };

  const showEditModalHandle = () => {
    setShowEditModal(true);
    setCurrentTodoId(id);
  };

  return (
    <div
      className={`${currentTodoId === id && 'bg-gray-300'} flex flex-row justify-between m-2 p-1 border-2 border-gray-700 rounded-md`}>
      <div className="flex justify-start">
        <div className="font-medium">{title}</div>
        <div className="font-light ml-2">- {description}</div>
        <div className="ml-2 font-light">
          (todo was created at{' '}
          {createdAt.endsWith('Z') ? createdAt.slice(0, 10) : createdAt})
        </div>
      </div>
      <div className="flex space-x-4">
        <button
          style={{ marginLeft: '10px' }}
          onClick={showEditModalHandle}
          className="bg-amber-500 text-white px-2 py-0.5 rounded-md hover:bg-amber-600 justify-end transition-colors duration-200 ease-in-out">
          Update
        </button>
        <button
          style={{ marginLeft: '10px' }}
          onClick={showDeleteModalHandle}
          className="bg-red-400 text-white px-2 py-0.5 rounded-md hover:bg-red-500 justify-end transition-colors duration-200 ease-in-out">
          Delete
        </button>
      </div>
    </div>
  );
};
