import { useState } from 'react';
import ProductCardVariants from './ProductCardVariants';
import placeholder from '/src/assets/placeholder.png';

function ProductCard({ name, description, product, handleAddItemToCart }) {
  const [areVariantsShown, setAreVariantsShown] = useState();
  return (
    <li className="productCard">
      <div className="productPreview">
        <img src={placeholder} alt=" " />
      </div>
      <div className="itemCard">
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
      <div className="productButtons">
        {product.variants.length > 1 ? (
          <button onClick={() => setAreVariantsShown(true)}>Show Option</button>
        ) : (
          <button onClick={() => handleAddItemToCart(product.variants[0].id)}>
            Add to Cart
          </button>
        )}
      </div>
      {areVariantsShown && (
        <ProductCardVariants
          handleAddItemToCart={handleAddItemToCart}
          variants={product.variants}
          closeVariants={() => setAreVariantsShown(false)}
        />
      )}
    </li>
  );
}

export default ProductCard;
