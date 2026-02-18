import { Box } from '@mui/material';
import { NavLink } from 'react-router';
import PanelMenu from './menu/PanelMenu';
import CartBadge from '../cart/components/CartBadge';

const Panel = () => {
    return (
        <Box component={'div'} className='navbar'>
            BIENVENIDO
            <div className='links'>
                <NavLink to='/'>HOME</NavLink>
                <NavLink to='/products'>PRODUCTS</NavLink>
                <NavLink to='/about'>ABOUT</NavLink>
            </div>
            <div style={{ display: 'flex' }}>
                <PanelMenu />
                <CartBadge />
            </div>
        </Box>
    );
};

export default Panel;
