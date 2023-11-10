import React from 'react';
import './Task.scss';
import DropdownTool from '../dropdown/DropdownTool';
import { TodoInterface } from '../../interfaces/todo.interface';
import { useTodo } from '../../contexts/TodoContext';
import AddTodo from '../inputs/AddTodo';
import Checkbox from '../inputs/Checkbox';

interface MyProps {
  task: TodoInterface;
}
export default function Task(props: MyProps) {
  const { getTasks, removeTask, toggleTask, updateTask, dispatch, state } =
    useTodo();
  const { title, completed, id } = props.task;
  const deleteTask = async () => {
    await removeTask(id);
    getTasks();
  };

  const toggleCompleteTask = async () => {
    await toggleTask(id, !completed);
    getTasks();
  };

  const onTaskUpdate = async (title: string) => {
    if (state.todo.id?.length > 0) {
      // Edit
      await updateTask({
        ...state.todo,
        title,
      });
    }
    getTasks();
  };

  return (
    <>
      <div className={`task-box ${completed && 'completed'}`} data-testid={`task-${id}`}>
        <Checkbox checked={completed} onChange={toggleCompleteTask} />
        <p> {title} </p>
        <div className="tools" data-testid={`task-tool-${id}`}>
          <DropdownTool
            onEdit={() => dispatch({ type: 'SET_TODO', payload: props.task })}
            onDelete={deleteTask}
          />
        </div>
      </div>
      {state?.todo?.id === id && (
        <>
          <AddTodo onInputSubmit={onTaskUpdate} title={state.todo.title} />
        </>
      )}
    </>
  );
}
