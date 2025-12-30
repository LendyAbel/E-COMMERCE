import Panel from './panel/Panel';
import About from './pages/About';
import Home from './pages/Home';
import { Routes, Route } from 'react-router';
import Products from './pages/Products';

function App() {
  return (
    <>
      <Panel />
      <Routes>
        <Route index element={<Home />} />
        <Route path='products' element={<Products />} />
        <Route path='about' element={<About />} />
      </Routes>
    </>
  );
}

export default App;
