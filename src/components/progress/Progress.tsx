import './Progress.scss';
import React from 'react';
import { useTodo } from '../../contexts/TodoContext';
export default function Progress() {
  const { state } = useTodo();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const totalTasks = state?.originalTodos.length || 0;
    const completedTasks = state?.originalTodos.filter((todo) => todo.completed)
      .length;
    const progressPercent =
      totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    setProgress(progressPercent);
  }, [state.originalTodos]);

  return (
    <section className="progress-box">
      <h2>Progress</h2>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }} />
      </div>
      <p>
        {state?.originalTodos.filter((todo) => todo.completed).length} completed
      </p>
    </section>
  );
}
