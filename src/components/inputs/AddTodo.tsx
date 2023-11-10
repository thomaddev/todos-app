import React from 'react';
import './addTodo.scss';
interface MyProps {
  onInputSubmit: (title: string) => void;
  title?: string;
}
export default function AddTodo(props: MyProps) {
  const [title, setTitle] = React.useState<string>('');

  const submitTask = () => {
    props.onInputSubmit(title);
    setTitle('');
  };

  React.useEffect(() => {
    setTitle(props.title ?? '');
  }, [props.title]);

  return (
    <div className="form-control-add-to-do">
      <input
        type="text"
        placeholder="Add your todo..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {title?.length > 0 && (
        <button type={'button'} onClick={submitTask}>
          Save
        </button>
      )}
    </div>
  );
}
