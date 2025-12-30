import { Box } from '@mui/material';
import { NavLink } from 'react-router';
import PanelMenu from './menu/PanelMenu';

const Panel = () => {
  return (
    <Box component={'div'} className='navbar'>
      BIENVENIDO
      <div className='links'>
        <NavLink to='/'>HOME</NavLink>
        <NavLink to='/products'>PRODUCTS</NavLink>
        <NavLink to='/about'>ABOUT</NavLink>
      </div>
      <PanelMenu />
    </Box>
  );
};

export default Panel;
