import { Box, FormHelperText, Input } from '@mui/material';
import { PRODUCT_STATUS, type ProductStatus } from '../../../productTypes';
import type { NewProductFormValues } from '../../../schemas/newProductSchema';

import SimpleSelect from '../../UI/Inputs/SimpleSelect';
import MultipleSelect from '../../UI/Inputs/MultipleSelect';

import { useQuery } from '@tanstack/react-query';
import { fetchAllCategories } from '../../../services/categoryServices';
import {
    Controller,
    type Control,
    type FieldError,
    type FieldErrors,
    type UseFormRegister,
} from 'react-hook-form';

interface OptionalFieldsProps {
    control: Control<NewProductFormValues>;
    register: UseFormRegister<NewProductFormValues>;
    errors: FieldErrors<NewProductFormValues>;
}

// AUX FUNTION FOR REQUIRED ADVISE
const RequiredAdvise = ({ error }: { error: FieldError | undefined }) => {
    return (
        <>{error && <FormHelperText error>{error?.message}</FormHelperText>}</>
    );
};

const OptionalFields = ({ control, register, errors }: OptionalFieldsProps) => {
    const { data } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchAllCategories,
        retry: 3,
    });
    const categories = data ?? [];
    const categoriesOptions = categories.map(cat => cat.slug);
    const statusOptions: ProductStatus[] = [...PRODUCT_STATUS];

    return (
        <Box className='input-container' component='div'>
            <Controller
                name='mainCategory'
                control={control}
                render={({ field }) => (
                    <SimpleSelect
                        label='Main Category'
                        name='mainCategory'
                        value={field.value}
                        options={categoriesOptions}
                        onChange={field.onChange}
                    />
                )}
            />

            <Controller
                name='otherCategory'
                control={control}
                render={({ field }) => (
                    <MultipleSelect
                        label='Other Categories'
                        name='otherCategories'
                        value={field.value}
                        options={categoriesOptions}
                        onChange={field.onChange}
                    />
                )}
            />

            <Controller
                name='status'
                control={control}
                render={({ field }) => (
                    <SimpleSelect
                        label='Status'
                        name='status'
                        value={field.value}
                        options={statusOptions}
                        onChange={field.onChange}
                    />
                )}
            />

            {/* slug, longDescription, brand, stock */}
            <Box className='input-container' component='div'>
                <Input placeholder='Slug' {...register('slug')} />
                <Input
                    placeholder='Long Description'
                    {...register('longDescription')}
                />
                <Input placeholder='Brand' {...register('brand')} />
                <Input
                    placeholder='Stock'
                    {...register('stock', { valueAsNumber: true })}
                    type='number'
                />
                <RequiredAdvise error={errors.stock} />
            </Box>
        </Box>
    );
};

export default OptionalFields;
