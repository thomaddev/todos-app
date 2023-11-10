import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoContext, TodoContextType } from '../../contexts/TodoContext';
import AddTodo from './AddTodo';

describe('AddTodo component', () => {
  it('should change input correctly', () => {
    render(
      <TodoContext.Provider value={{} as TodoContextType}>
        <AddTodo onInputSubmit={() => {}} />
      </TodoContext.Provider>,
    );
    const inputElement: HTMLInputElement =
      screen.getByPlaceholderText('Add your todo...');

    fireEvent.change(inputElement, { target: { value: 'New Task' } });

    expect(inputElement.value).toBe('New Task');
  });

  it('should trigger button with valid input', () => {
    const onInputSubmitMock = jest.fn();
    render(
      <TodoContext.Provider value={{} as TodoContextType}>
        <AddTodo onInputSubmit={onInputSubmitMock} />
      </TodoContext.Provider>,
    );
    const inputElement = screen.getByPlaceholderText('Add your todo...');
    fireEvent.change(inputElement, { target: { value: 'New Task' } });

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(onInputSubmitMock).toHaveBeenCalledWith('New Task');
  });
});
