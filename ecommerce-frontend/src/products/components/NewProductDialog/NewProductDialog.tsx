import RequiredFields from './RequiredFields/RequiredFields';
import OptionalFields from './OptionalsFields/OptionalsFields';

import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Close } from '@mui/icons-material';

import ShowHide from '../UI/ShowHide';
import { useAddProduct } from '../../hooks/useAddProduct';
import { useNewProductDialog } from '../../hooks/useNewProductDialog';
import { useNotificationContext } from '../../../notifications/hooks/useNotification';
import { useForm } from 'react-hook-form';
import {
    newProductSchema,
    type NewProductFormValues,
} from '../../schemas/newProductSchema';
import { zodResolver } from '@hookform/resolvers/zod';

const defaultFormValues: NewProductFormValues = {
    sku: '',
    name: '',
    shortDescription: '',
    price: 0,
    vatType: 21,
    slug: '',
    longDescription: '',
    brand: '',
    stock: 0,
    mainCategory: undefined,
    otherCategory: [],
    status: undefined,
};

const NewProductDialog = () => {
    const { isOpen, close } = useNewProductDialog();
    const { mutateAsync: addProduct } = useAddProduct();
    const { setNotification } = useNotificationContext();

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<NewProductFormValues>({
        resolver: zodResolver(newProductSchema),
        defaultValues: defaultFormValues,
    });

    const onSubmit = async (data: NewProductFormValues) => {
        try {
            addProduct(data);
            reset();
            close();
            setNotification('Product added successfully', 'success');
        } catch (error) {
            setNotification(`Error adding product:${error}`, 'error');
        }
    };

    return (
        <Dialog
            aria-labelledby='dialogTittle'
            fullWidth={true}
            open={isOpen}
            onClose={close}
        >
            <Box component={'div'} className='dialog'>
                <DialogTitle id='dialogTittle'>Add new product</DialogTitle>
                <DialogContent>
                    <Box
                        className='form'
                        component={'form'}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <RequiredFields register={register} errors={errors} />
                        <ShowHide label='optionals'>
                            <OptionalFields
                                register={register}
                                control={control}
                                errors={errors}
                            />
                        </ShowHide>
                        <Box component={'div'} className='form-buttons'>
                            <Button
                                type='submit'
                                color='success'
                                variant='contained'
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Adding...' : 'Add'}
                            </Button>
                            <Button
                                type='button'
                                color='error'
                                variant='contained'
                                onClick={close}
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
                onClick={close}
            >
                <Close />
            </Button>
        </Dialog>
    );
};

export default NewProductDialog;
