import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { TodoInterface } from '../interfaces/todo.interface';
import axios from 'axios';
import {
  FILTER_DONE,
  FILTER_UNDONE,
  FilterType,
} from '../constant';

interface State {
  originalTodos: TodoInterface[];
  todos: TodoInterface[];
  todo: TodoInterface;
}

type Action =
  | { type: 'GET_TODOS'; payload: TodoInterface[] }
  | {
      type: 'FILTER_TODOS';
      payload: FilterType;
    }
  | { type: 'SET_TODO'; payload: TodoInterface }
  | { type: 'RESET_TODO' }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'REMOVE_TODO'; payload: string };

type TodoContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
  getTasks: () => Promise<void>;
  addTask: (task: TodoInterface) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
  toggleTask: (id: string, completed: boolean) => Promise<void>;
  updateTask: (task: TodoInterface) => Promise<void>;
};

const initialState: State = {
  originalTodos: [],
  todos: [],
  todo: {
    id: '',
    completed: false,
    title: '',
  },
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);
const todoReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'GET_TODOS':
      return { ...state, originalTodos: action.payload, todos: action.payload };
    case 'FILTER_TODOS':
      let filteredTodos;
      if (action.payload === FILTER_DONE) {
        filteredTodos = [...state.originalTodos].filter((t) => t.completed);
      } else if (action.payload === FILTER_UNDONE) {
        filteredTodos = [...state.originalTodos].filter((t) => !t.completed);
      } else {
        filteredTodos = [...state.originalTodos];
      }
      return { ...state, todos: filteredTodos };
    case 'SET_TODO':
      return { ...state, todo: action.payload };
    case 'RESET_TODO':
      return { ...state, todo: { id: '', completed: false, title: '' } };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
};

interface TodoProviderProps {
  children: ReactNode;
}

const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  async function getTasks() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_PATH}/todos`);
      const todos = response.data;
      dispatch({ type: 'GET_TODOS', payload: todos });
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }

  async function addTask(task: TodoInterface) {
    try {
      await axios.post(`${process.env.REACT_APP_API_PATH}/todos`, {
        ...task,
      });
      dispatch({ type: 'RESET_TODO' });
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }

  async function removeTask(id: string) {
    try {
      await axios.delete(`${process.env.REACT_APP_API_PATH}/todos/${id}`);
      dispatch({ type: 'RESET_TODO' });
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }

  async function toggleTask(id: string, completed: boolean) {
    try {
      await axios.patch(`${process.env.REACT_APP_API_PATH}/todos/${id}`, {
        completed,
      });
      dispatch({ type: 'RESET_TODO' });
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }

  async function updateTask(task: TodoInterface) {
    try {
      await axios.patch(`${process.env.REACT_APP_API_PATH}/todos/${task.id}`, {
        title: task.title,
        completed: task.completed,
      });
      dispatch({ type: 'RESET_TODO' });
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }

  return (
    <TodoContext.Provider
      value={{
        state,
        dispatch,
        getTasks,
        addTask,
        removeTask,
        toggleTask,
        updateTask,
      }}>
      {children}
    </TodoContext.Provider>
  );
};

const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoContext');
  }
  return context;
};

export { TodoProvider, useTodo };
