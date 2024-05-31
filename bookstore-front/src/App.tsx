import { ThemeProvider } from 'styled-components';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import { GlobalStyle } from './style/global';
import { ThemeName, getTheme } from './style/theme';
import ThemeSwitcher from './components/header/ThemeSwitcher';
import { useContext, useState } from 'react';
import { BookStoreThemeProvider, ThemeContext } from './context/themeContext';

function App() {
  const { themeName, setThemeName } = useContext(ThemeContext);

  return (
    <BookStoreThemeProvider>
      <ThemeProvider theme={getTheme(themeName)}>
        <GlobalStyle themeName={themeName} />
        <ThemeSwitcher themeName={themeName} setThemeName={() => {}} />
        <Layout>
          <Home />
        </Layout>
      </ThemeProvider>
    </BookStoreThemeProvider>
  );
}

export default App;
