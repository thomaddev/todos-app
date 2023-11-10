import React from 'react';
import './Dropdown.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import {
  FILTER_ALL,
  FILTER_DONE,
  FILTER_UNDONE,
  FilterType,
} from '../../constant';

interface MyProps {
  changeFilter: (filter: FilterType) => void;
}
export default function Dropdown(props: MyProps) {
  const dropdownRef = React.useRef<HTMLDivElement | null>(null); // Define the ref type
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = React.useState<FilterType>(
    FILTER_ALL,
  );

  // Add an event listener to close the dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOpen = () => {
    setOpen(!open);
  };

  const onFilterChange = (filter: FilterType) => {
    setOpen(false);
    setFilter(filter);
    props.changeFilter(filter);
  };

  return (
    <div className="dropdown dropdown-select" ref={dropdownRef}>
      <button onClick={handleOpen}>
        <p>{filter}</p>
        <FontAwesomeIcon icon={open ? faAngleUp : faAngleDown} />
      </button>
      {open && (
        <div className="menu" data-testid={'dropdown-menu'}>
          <ul>
            <li
              className={`menu-item ${filter === FILTER_ALL ? 'active' : ''}`}
              onClick={() => onFilterChange(FILTER_ALL)}>
              {FILTER_ALL}
            </li>
            <li
              className={`menu-item ${filter === FILTER_DONE ? 'active' : ''}`}
              onClick={() => onFilterChange(FILTER_DONE)}>
              {FILTER_DONE}
            </li>
            <li
              className={`menu-item ${
                filter === FILTER_UNDONE ? 'active' : ''
              }`}
              onClick={() => onFilterChange(FILTER_UNDONE)}>
              {FILTER_UNDONE}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
