import { NewProduct } from '../ProductTypes';
import { NewProductSchema } from './productSchema';

export class NewProductValidator {
    static validate(data: unknown): NewProduct {
        return NewProductSchema.parse(data) as NewProduct;
    }
}
