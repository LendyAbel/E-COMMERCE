import Panel from './panel/Panel';
import About from './pages/About';
import Home from './pages/Home';
import { Routes, Route } from 'react-router';
import Products from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <>
      <Panel />
      <Routes>
        <Route index element={<Home />} />
        <Route path='products' element={<Products />} />
        <Route path='about' element={<About />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
