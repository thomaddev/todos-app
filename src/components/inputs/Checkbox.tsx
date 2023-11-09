import React from 'react';
import './AddTodo.scss';
interface MyProps {
  checked: boolean;
  onChange: () => void;
}
export default function Checkbox(props: MyProps) {
  const { checked, onChange } = props;
  const uniqueId = `custom-checkbox-${Math.random().toString(36).substring(7)}`;

  return (
    <div className="checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onChange()}
        id={uniqueId}
      />
      <label htmlFor={uniqueId}></label>
    </div>
  );
}
