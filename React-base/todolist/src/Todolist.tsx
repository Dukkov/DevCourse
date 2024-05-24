import React, { useState } from 'react';

type Todo = {
  id: number;
  text: string;
  isChecked: boolean;
};

const TodoList: React.FC = () => {
  const title: string = '오늘 할 일';
  let [tasks, setTasks] = useState<Todo[]>([
    { id: 1, text: '일찍 자기', isChecked: false },
    { id: 2, text: '공부하기', isChecked: false },
    { id: 3, text: '책 읽기', isChecked: false }
  ]);

  const handleCheckedChange = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isChecked: !task.isChecked } : task
      )
    );
  };

  return (
    <div className="container">
      <h1>{title}</h1>
      <div className="board" />
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.isChecked}
              onChange={() => handleCheckedChange(task.id)}
            />
            <span>
              {task.isChecked ? (
                <del>{task.text}</del>
              ) : (
                <span>{task.text}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
