import React from 'react';
import './App.scss';
import Progress from './components/progress/Progress';
import Dropdown from './components/dropdown/Dropdown';
import Task from './components/task/Task';
import AddTodo from './components/inputs/AddTodo';
import { useTodo } from './contexts/TodoContext';
import { FilterType } from './constant';

function App() {
  const { getTasks, addTask, state, dispatch } = useTodo();

  React.useEffect(() => {
    getTasks();
  }, []);

  const onAddTask = async (title: string) => {
    await addTask({
      id: '',
      title,
      completed: false,
    });
    getTasks();
  };

  const onFilter = (filter: FilterType) => {
    dispatch({ type: 'FILTER_TODOS', payload: filter });
  };

  return (
    <div className="App">
      <div className="main-wrapper">
        <div>
          <Progress />
        </div>
        <div>
          <div className="d-flex justify-space-between align-items-center">
            <h1 style={{ flex: 4 }} className="text-left">
              Tasks
            </h1>
            <div style={{ flex: 1 }}>
              <Dropdown changeFilter={onFilter} />
            </div>
          </div>
        </div>
        <div className="todos-lists">
          {state?.todos &&
            state?.todos.map((todo) => (
              <Task key={`task-${todo.id}`} task={todo} />
            ))}
        </div>
        <div>
          <AddTodo onInputSubmit={onAddTask} />
        </div>
      </div>
    </div>
  );
}

export default App;
