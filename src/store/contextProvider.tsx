import { TodoType } from '../types/types.ts';
import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

type ContextType = {
  todos: TodoType[];
  setTodos: Dispatch<SetStateAction<ContextType['todos']>>;
  showDeleteModal: boolean;
  setShowDeleteModal: Dispatch<SetStateAction<ContextType['showDeleteModal']>>;
  showEditModal: boolean;
  setShowEditModal: Dispatch<SetStateAction<ContextType['showEditModal']>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<ContextType['isLoading']>>;
  currentTodoId: string;
  setCurrentTodoId: Dispatch<SetStateAction<ContextType['currentTodoId']>>;
};

const initialContext: ContextType = {
  todos: [],
  setTodos: () => {},
  showDeleteModal: false,
  setShowDeleteModal: () => {},
  showEditModal: false,
  setShowEditModal: () => {},
  isLoading: false,
  setIsLoading: () => {},
  currentTodoId: '',
  setCurrentTodoId: () => {},
};

export const Context = createContext<ContextType>(initialContext);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<ContextType['todos']>(
    initialContext.todos,
  );
  const [showDeleteModal, setShowDeleteModal] = useState<
    ContextType['showDeleteModal']
  >(initialContext.showDeleteModal);
  const [showEditModal, setShowEditModal] = useState<
    ContextType['showEditModal']
  >(initialContext.showEditModal);
  const [isLoading, setIsLoading] = useState<ContextType['isLoading']>(
    initialContext.isLoading,
  );
  const [currentTodoId, setCurrentTodoId] = useState<
    ContextType['currentTodoId']
  >(initialContext.currentTodoId);

  return (
    <Context.Provider
      value={{
        todos,
        setTodos,
        showDeleteModal,
        setShowDeleteModal,
        showEditModal,
        setShowEditModal,
        isLoading,
        setIsLoading,
        currentTodoId,
        setCurrentTodoId,
      }}>
      {children}
    </Context.Provider>
  );
};
