import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Timer from './Timer';
import Clock from './Clock';
import TodoModal from './TodoModal';

type Todo = {
  id: number;
  text: string;
  isChecked: boolean;
};

const TodoList: React.FC = () => {
  const title: string = '오늘 할 일';
  const [tasks, setTasks] = useState<Todo[]>([
    { id: 1, text: '일찍 자기', isChecked: false },
    { id: 2, text: '공부하기', isChecked: false },
    { id: 3, text: '책 읽기', isChecked: false }
  ]);

  const [newTask, setNewTask] = useState<string>('');

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const [selectedTask, setSelectedTask] = useState<Todo | null>(null);

  const handleCheckedChange = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isChecked: !task.isChecked } : task
      )
    );
  };

  const handleTaskClick = (task: Todo) => {
    setShowDetail(true);
    setSelectedTask(task);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  const addTask = () => {
    if (newTask.trim().length > 0) {
      setTasks([...tasks, { id: Date.now(), text: newTask, isChecked: false }]);
      setNewTask('');
    }
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container">
      <h1>{title}</h1>
      <div>
        <input
          type="text"
          placeholder="할 일 입력"
          style={{ marginRight: '10px', writingMode: 'horizontal-tb' }}
          onChange={(e) => setNewTask(e.target.value)}
        ></input>
        <Button onClick={() => addTask()}>추가</Button>
      </div>
      <div className="board">
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.isChecked}
                onChange={() => handleCheckedChange(task.id)}
              />
              <span onClick={() => handleTaskClick(task)}>
                {task.isChecked ? (
                  <del>{task.text}</del>
                ) : (
                  <span>{task.text}</span>
                )}
              </span>
              <button
                className="del-button"
                onClick={() => removeTask(task.id)}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Clock />
      <Timer />
      <TodoModal
        show={showDetail}
        task={selectedTask}
        handleClose={handleCloseDetail}
      ></TodoModal>
    </div>
  );
};

export default TodoList;
