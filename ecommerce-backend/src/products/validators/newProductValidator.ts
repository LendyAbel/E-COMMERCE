import { NewProduct } from '../types';
import { toNewProduct } from '../util';

export class NewProductValidator {
  static validate(data: unknown): NewProduct {
    return toNewProduct(data);
  }
}
