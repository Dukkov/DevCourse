import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const name: string = 'Reac';
  const style: object = {
    backgroundColor: 'black',
    color: 'white',
    padding: '20px'
  };

  return (
    <div className="App-header" style={style}>
      <h1>Hello, {name === 'Rea' ? 'Yes' : ''}!</h1>
      <p>Well met</p>
    </div>
  );

  // const port = undefined;

  // return <div>{port || '포트 없음'}</div>;
}

export default App;
