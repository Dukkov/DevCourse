import React, { Component } from 'react';

interface MyProps {
  weather: string;
  children: React.ReactNode;
}

const MyWeather: React.FC<MyProps> = (props) => {
  const { weather, children } = props;

  return (
    <div>
      {children}
      <p></p>
      오늘의 날씨는 {weather}입니다.
    </div>
  );
};

// class MyWeather extends Component<MyProps> {
//   render() {
//     const { weather, children } = this.props;
//     return (
//       <div>
//         {children}
//         <p></p>
//         오늘의 날씨는 {weather}입니다.
//       </div>
//     );
//   }
// }

export default MyWeather;
