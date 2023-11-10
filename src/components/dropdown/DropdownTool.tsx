import React from 'react';
import './Dropdown.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

interface Myprops {
  onEdit: () => void;
  onDelete: () => void;
}
export default function DropdownTool(props: Myprops) {
  const dropdownRef = React.useRef<HTMLDivElement | null>(null); // Define the ref type
  const [open, setOpen] = React.useState(false);

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

  return (
    <div className="dropdown dropdown-tool" ref={dropdownRef}>
      <FontAwesomeIcon icon={faEllipsis} onClick={handleOpen} data-testid={'dropdown-tool-icon'} />
      {open && (
        <div className="menu">
          <ul>
            <li onClick={props.onEdit}>edit</li>
            <li onClick={props.onDelete}>delete</li>
          </ul>
        </div>
      )}
    </div>
  );
}
