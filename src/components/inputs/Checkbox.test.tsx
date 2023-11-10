import React from 'react';
import { TodoInterface } from '../../interfaces/todo.interface';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoContext, TodoContextType } from '../../contexts/TodoContext';
import Checkbox from './Checkbox';

describe('Checkbox component', () => {
  it('should checkbox to be checked when checked is true', () => {
    render(
      <TodoContext.Provider value={{} as TodoContextType}>
        <Checkbox checked={true} onChange={() => {}} />
      </TodoContext.Provider>,
    );
    // Get the checkbox input element
    const checkboxInput = screen.getByRole('checkbox');

    // Assert that the checkbox is not initially checked
    expect(checkboxInput).toBeChecked();
  });

  it('should checkbox to be checked when checked is false', () => {
    render(
      <TodoContext.Provider value={{} as TodoContextType}>
        <Checkbox checked={false} onChange={() => {}} />
      </TodoContext.Provider>,
    );
    // Get the checkbox input element
    const checkboxInput = screen.getByRole('checkbox');

    // Assert that the checkbox is not initially checked
    expect(checkboxInput).not.toBeChecked();
  });
});
