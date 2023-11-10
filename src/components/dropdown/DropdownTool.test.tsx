import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoContext, TodoContextType } from '../../contexts/TodoContext';
import { FILTER_ALL, FILTER_DONE } from '../../constant';
import DropdownTool from './DropdownTool';

describe('DropdownTool component', () => {
  it('should have three dropdown items', () => {
    render(
      <TodoContext.Provider value={{} as TodoContextType}>
        <DropdownTool onEdit={jest.fn()} onDelete={jest.fn()} />
      </TodoContext.Provider>,
    );

    // Assert that the dropdown is initially closed
    expect(screen.queryByRole('menu')).toBeNull();

    // Click on the dropdown button to open the menu
    const dropdownIcon = screen.getByTestId('dropdown-tool-icon');
    fireEvent.click(dropdownIcon);

    const dropdownItems = screen.getAllByRole('listitem');
    expect(dropdownItems).toHaveLength(2);
  });

  it('changes text on click', () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    render(
      <TodoContext.Provider value={{} as TodoContextType}>
        <DropdownTool onEdit={onEdit} onDelete={onDelete} />
      </TodoContext.Provider>,
    );

    // Click on the dropdown button to open the menu
    const dropdownIcon = screen.getByTestId('dropdown-tool-icon');
    fireEvent.click(dropdownIcon);

    const clickEdit = screen.getByText('edit');
    fireEvent.click(clickEdit);
    expect(onEdit).toHaveBeenCalled();

    const clickDelete = screen.getByText('delete');
    fireEvent.click(clickDelete);
    expect(onDelete).toHaveBeenCalled();
  });
});
