import { useState } from 'react';

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);

  return (
    <div>
      <h2>타이머: {seconds}초</h2>
      <button
        onClick={() => {
          setInterval(() => {
            setSeconds((prev) => prev + 1);
          }, 1000);
        }}
      >
        타이머 시작하기
      </button>
    </div>
  );
};

export default Timer;
