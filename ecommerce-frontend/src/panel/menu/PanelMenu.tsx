import { Menu } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useState } from 'react';

const PanelMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuToglle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='navbar-menu'>
      <Button onClick={handleMenuToglle}>
        <Menu />
      </Button>
      {isOpen && (
        <div className='panel-menu'>
          <Button>Option 1</Button>
          <Button>Option 2</Button>
          <Button>Option 3</Button>
        </div>
      )}
    </div>
  );
};

export default PanelMenu;
