import React from 'react';
import { ThemeName } from '../../style/theme';

interface Props {
  themeName: ThemeName;
  setThemeName: (themename: ThemeName) => void;
}

const ThemeSwitcher = ({ themeName, setThemeName }: Props) => {
  const toggleTheme = () => {
    setThemeName(themeName === 'light' ? 'dark' : 'light');
  };

  return <button onClick={toggleTheme}>{themeName}</button>;
};

export default ThemeSwitcher;
