import { Activity, useState } from 'react';

import RequiredFields from './RequiredFields/RequiredFields';

import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Close } from '@mui/icons-material';

import type { NewProduct } from '../../../productTypes';
import OptionalFields from './OptionalsFields/OptionalsFields';

interface NewProductDialogProps {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const styleDialog = {
  minWidth: 500,
  minHeight: 300,
  padding: 2,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const NewProductDialog = ({
  open,
  onAccept,
  onClose,
}: NewProductDialogProps) => {
  const [newProduct, setNewProduct] = useState<NewProduct>({} as NewProduct);
  const [optional, setOptional] = useState(false);

  const handleOptionalCLick = () => {
    setOptional(!optional);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAccept();
  };

  return (
    <Dialog open={open}>
      <Box sx={styleDialog}>
        <DialogTitle>Add new product</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
            }}
            component='form'
            onSubmit={handleSubmit}
          >
            <Activity mode={!optional ? 'visible' : 'hidden'}>
              <RequiredFields
                newProduct={newProduct}
                setNewProduct={setNewProduct}
              />
              <Button type='submit' variant='contained'>
                Add
              </Button>
            </Activity>
            <Activity mode={optional ? 'visible' : 'hidden'}>
              <OptionalFields
                newProduct={newProduct}
                setNewProduct={setNewProduct}
              />
            </Activity>
            <Button variant='outlined' onClick={handleOptionalCLick}>
              {!optional ? 'Optional' : 'Back'}
            </Button>
          </Box>
        </DialogContent>
      </Box>
      <Button
        sx={{ position: 'absolute', top: 1, right: 1 }}
        variant='text'
        onClick={onClose}
      >
        <Close />
      </Button>
    </Dialog>
  );
};

export default NewProductDialog;
