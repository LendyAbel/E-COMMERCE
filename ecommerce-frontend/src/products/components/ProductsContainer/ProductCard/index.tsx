import type { Product } from '../../../productTypes';

interface ProductCardProps {
    product: Product;
}
const ProductCard = ({product}:ProductCardProps) => {
  return (
    <div>
        <h2>{product.name}</h2>
        <p>{product.shortDescription}</p>
        <p>Price: ${product.price}</p>
    </div>
  )
}

export default ProductCard