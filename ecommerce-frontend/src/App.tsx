import Panel from './panel/Panel';
import About from './pages/About';
import Home from './pages/Home';
import { Routes, Route } from 'react-router';
import Products from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register';
import Notification from './notifications/Notification';
import Cart from './pages/Cart';

function App() {
    return (
        <>
            <Panel />
            <Notification />
            <Routes>
                <Route index element={<Home />} />
                <Route path='products' element={<Products />} />
                <Route path='about' element={<About />} />
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='cart' element={<Cart />} />
            </Routes>
        </>
    );
}

export default App;
