import axios from 'axios';
import { TodoType } from '../types/types.ts';

const BASE_URL = 'https://669f5eacb132e2c136fd951b.mockapi.io/api/v1/todos';

const getAllTodos = async (): Promise<TodoType[]> => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

const createTodo = async (todo: Omit<TodoType, 'id'>): Promise<TodoType> => {
  try {
    const response = await axios.post(BASE_URL, todo);
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

const updateTodo = async (updatedTodo: TodoType): Promise<TodoType> => {
  try {
    const response = await axios.put(
      `${BASE_URL}/${updatedTodo.id}`,
      updatedTodo,
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating todo with id ${updatedTodo.id}:`, error);
    throw error;
  }
};

const deleteTodo = async (id: string): Promise<TodoType> => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting todo with id ${id}:`, error);
    throw error;
  }
};

export { getAllTodos, createTodo, updateTodo, deleteTodo };
