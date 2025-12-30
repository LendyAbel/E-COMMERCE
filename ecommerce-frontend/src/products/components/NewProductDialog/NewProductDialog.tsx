import RequiredFields from './RequiredFields/RequiredFields';
import OptionalFields from './OptionalsFields/OptionalsFields';

import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Close } from '@mui/icons-material';
import ShowHide from '../UI/ShowHide';

interface NewProductDialogProps {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const NewProductDialog = ({
  open,
  onAccept,
  onClose,
}: NewProductDialogProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAccept();
  };

  return (
    <Dialog
      aria-labelledby='dialogTittle'
      fullWidth={true}
      open={open}
      onClose={onClose}
    >
      <Box component={'div'} className='dialog'>
        <DialogTitle id='dialogTittle'>Add new product</DialogTitle>
        <DialogContent>
          <Box className='form' component={'form'} onSubmit={handleSubmit}>
            <RequiredFields />
            <ShowHide label='optionals'>
              <OptionalFields />
            </ShowHide>
            <Box component={'div'} className='form-buttons'>
              <Button type='submit' color='success' variant='contained'>
                Add
              </Button>
              <Button
                type='button'
                color='error'
                variant='contained'
                onClick={onClose}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Box>
      <Button
        sx={{ position: 'absolute', top: 10, right: 10 }}
        variant='text'
        onClick={onClose}
      >
        <Close />
      </Button>
    </Dialog>
  );
};

export default NewProductDialog;
