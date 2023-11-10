import React from 'react';
import { TodoInterface } from '../../interfaces/todo.interface';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoContext, TodoContextType } from '../../contexts/TodoContext';
import Progress from './Progress';

const mockTasks: TodoInterface[] = [
  {
    id: '1',
    title: 'Test Task',
    completed: false,
  },
  {
    id: '2',
    title: 'Test Task',
    completed: true,
  },
  {
    id: '3',
    title: 'Test Task',
    completed: false,
  },
];

describe('Progress component', () => {
  it('renders Progress component with correct progress and completion text', () => {
    render(
      <TodoContext.Provider value={{} as TodoContextType}>
        <Progress originalTodos={mockTasks} />
      </TodoContext.Provider>,
    );
    // Calculate expected progress percentage
    const completedTasks = mockTasks.filter((task) => task.completed).length;
    const totalTasks = mockTasks.length;
    const expectedProgress = (completedTasks / totalTasks) * 100;

    // Assert the presence of the progress bar
    const progressBox = screen.getByTestId('progress-box');
    expect(progressBox).toBeInTheDocument();

    // Assert the style attribute of the progress bar
    const progress = screen.getByTestId('progress');
    expect(progress).toHaveStyle(`width: ${expectedProgress}%;`);

    // Assert the completion text
    const completionText = screen.getByText(`${completedTasks} completed`);
    expect(completionText).toBeInTheDocument();
  });
});
