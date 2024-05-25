import React from 'react';
import TodoList from './Todolist';
import MyWeather from './MyWeather';
import './App.css';

function App() {
  return (
    <div>
      <TodoList />
      <MyWeather weather="맑음">일기예보</MyWeather>
    </div>
  );
}

export default App;
