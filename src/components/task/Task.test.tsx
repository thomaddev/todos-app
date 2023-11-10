import React from 'react';
import { TodoInterface } from '../../interfaces/todo.interface';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Task from './Task';
import { TodoContext, TodoContextType } from '../../contexts/TodoContext';

const mockTask: TodoInterface = {
  id: '1',
  title: 'Test Task',
  completed: false,
};

const mockTaskCompleted: TodoInterface = {
  id: '1',
  title: 'Test Task',
  completed: true,
};

describe('Task component', () => {
  it('should render Task component correctly', () => {
    render(
      <TodoContext.Provider value={{} as TodoContextType}>
        <Task task={mockTask} />
      </TodoContext.Provider>,
    );
    const element = screen.getByTestId(`task-${mockTask.id}`);
    const paragraphElement = screen.getByText(mockTask.title);
    const elementTool = screen.getByTestId(`task-tool-${mockTask.id}`);
    expect(element).toBeInTheDocument();
    expect(paragraphElement).toBeInTheDocument();
    expect(elementTool).toBeInTheDocument();
  });
});

describe('Task component by undone task', () => {
  it('should renders Task component with undone task correctly', () => {
    render(
      <TodoContext.Provider value={{} as TodoContextType}>
        <Task task={mockTask} />
      </TodoContext.Provider>,
    );

    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).toBeInTheDocument();
    expect(checkboxElement).not.toHaveAttribute('checked');
  });

  it('should render Task with undone styling correctly', () => {
    render(
      <TodoContext.Provider value={{} as TodoContextType}>
        <Task task={mockTask} />
      </TodoContext.Provider>,
    );
    const paragraphElement = screen.getByText(mockTask.title);
    expect(paragraphElement).not.toHaveStyle({
      color: '#A9A9A9',
      textDecoration: 'line-through',
    });
  });
});

describe('Task component by done task', () => {
  it('should renders Task component with done task correctly', () => {
    render(
      <TodoContext.Provider value={{} as TodoContextType}>
        <Task task={mockTaskCompleted} />
      </TodoContext.Provider>,
    );

    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).toBeInTheDocument();
    expect(checkboxElement).toHaveAttribute('checked');
  });

  it('should render Task with done styling correctly', () => {
    render(
      <TodoContext.Provider value={{} as TodoContextType}>
        <Task task={mockTask} />
      </TodoContext.Provider>,
    );
    const paragraphElement = screen.getByText(mockTask.title);
    expect(paragraphElement).not.toHaveStyle({
      color: '#A9A9A9',
      textDecoration: 'line-through',
    });
  });
});
