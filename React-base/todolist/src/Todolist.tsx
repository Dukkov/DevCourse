import React, { useState } from 'react';

const TodoList: React.FC = () => {
  const title: string = '오늘 할 일';
  let [taskName, setTaskName] = useState<string>('일찍 자기');

  return (
    <div className="container">
      <div className="board">
        <h1>{title}</h1>
        <ul>
          <li>{taskName}</li>
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
