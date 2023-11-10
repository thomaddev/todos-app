import './Progress.scss';
import React from 'react';
import { TodoInterface } from '../../interfaces/todo.interface';

interface MyProps {
  originalTodos: TodoInterface[];
}

export default function Progress(props: MyProps) {
  const [progress, setProgress] = React.useState(0);
  const { originalTodos } = props;
  React.useEffect(() => {
    const totalTasks = originalTodos.length || 0;
    const completedTasks = originalTodos.filter(
      (todo) => todo.completed,
    ).length;
    const progressPercent =
      totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    setProgress(progressPercent);
  }, [originalTodos]);

  return (
    <section className="progress-box" data-testid={`progress-box`}>
      <h2>Progress</h2>
      <div className="progress-bar">
        <div
          className="progress"
          data-testid={`progress`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p data-testid={`progress-text`}>
        {`${
          originalTodos.filter((todo: TodoInterface) => todo.completed).length
        } completed`}
      </p>
    </section>
  );
}
