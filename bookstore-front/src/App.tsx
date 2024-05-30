import Layout from './components/layout/Layout';
import Home from './pages/Home';

function App() {
  return <Layout children={<Home />} />;
}

export default App;
