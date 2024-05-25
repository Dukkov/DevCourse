import { useState } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  setInterval(() => {
    setTime(new Date());
  }, 1000);

  return (
    <div>
      <h2>현재 시각: {time.toLocaleTimeString()}</h2>
    </div>
  );
};

export default Clock;
