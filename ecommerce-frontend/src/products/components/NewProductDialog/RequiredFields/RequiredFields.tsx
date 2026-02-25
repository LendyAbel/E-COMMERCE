import { Box, FormHelperText, Input } from '@mui/material';
import type { FieldError, FieldErrors, UseFormRegister } from 'react-hook-form';
import type { NewProductFormValues } from '../../../schemas/newProductSchema';

interface RequiredFieldsProps {
    register: UseFormRegister<NewProductFormValues>;
    errors: FieldErrors<NewProductFormValues>;
}

// AUX FUNTION FOR REQUIRED ADVISE
const RequiredAdvise = ({ error }: { error: FieldError | undefined }) => {
    return (
        <>{error && <FormHelperText error>{error?.message}</FormHelperText>}</>
    );
};

const RequiredFields = ({ register, errors }: RequiredFieldsProps) => {
    return (
        <Box className='input-container' component='div'>
            <Input placeholder='SKU' {...register('sku')} />
            <RequiredAdvise error={errors.sku} />

            <Input placeholder='Name' {...register('name')} />
            <RequiredAdvise error={errors.name} />

            <Input
                placeholder='Short Description'
                {...register('shortDescription')}
            />
            <RequiredAdvise error={errors.shortDescription} />

            <Input placeholder='Price' {...register('price',{valueAsNumber:true})} type='number' />
            <RequiredAdvise error={errors.price} />

            <Input
                placeholder='Vat Type'
                {...register('vatType',{valueAsNumber:true})}
                type='number'
            />
            <RequiredAdvise error={errors.vatType} />
        </Box>
    );
};

export default RequiredFields;
