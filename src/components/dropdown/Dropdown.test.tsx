import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoContext, TodoContextType } from '../../contexts/TodoContext';
import Dropdown from './Dropdown';
import {FILTER_ALL, FILTER_DONE} from "../../constant";

describe('Dropdown component', () => {
  const changeFilterMock = jest.fn();
  it('should have three dropdown items', () => {
    render(
      <TodoContext.Provider value={{} as TodoContextType}>
        <Dropdown changeFilter={changeFilterMock} />
      </TodoContext.Provider>,
    );

    // Click on the dropdown button to open the menu
    const dropdownButton = screen.getByRole('button');
    fireEvent.click(dropdownButton);

    const dropdownItems = screen.getAllByRole('listitem');
    expect(dropdownItems).toHaveLength(3);
  });

  it('changes text on click', () => {
    render(
        <TodoContext.Provider value={{} as TodoContextType}>
          <Dropdown changeFilter={changeFilterMock} />
        </TodoContext.Provider>,
    );

    const buttonText = screen.getByText(FILTER_ALL);

    // Click on the dropdown button to open the menu
    const dropdownButton = screen.getByRole('button');
    fireEvent.click(dropdownButton);

    // Click on the FILTER_DONE item
    const filterDoneItem = screen.getByText(FILTER_DONE);
    fireEvent.click(filterDoneItem);

    // Assert that the text has changed to FILTER_DONE
    expect(buttonText).toHaveTextContent(FILTER_DONE);

    // Assert that the changeFilter function is called with the correct argument
    expect(changeFilterMock).toHaveBeenCalledWith(FILTER_DONE);
  });
});
