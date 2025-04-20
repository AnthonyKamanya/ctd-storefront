import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

function ProductList({ inventory, handleAddItemToCart }) {
  // Initializing state to hold the processed list of products
  const [products, setProducts] = useState([]);
  // useEffect runs after the component renders and whenever 'inventory' changes
  useEffect(() => {
    // Temporary array to build the list of products
    const workingProducts = [];
    // Looping through each item in the inventory
    inventory.forEach((item) => {
      // Skip the item if it's not in stock
      if (!item.inStock) {
        return;
      }
      // Check if the product with the same baseName already exists in workingProducts
      if (
        !workingProducts.find(
          (productItem) => productItem.baseName === item.baseName
        )
      ) {
        workingProducts.push({
          baseName: item.baseName,
          price: item.price,
          baseDescription: item.baseDescription,
          variants: [{ ...item }], // Start with the current item as the first variant
        });
      } else {
        const index = workingProducts.findIndex(
          (productItem) => productItem.baseName === item.baseName
        );
        // If it exists, add the current item as a new variant
        workingProducts[index].variants.push({ ...item });
      }
    });
    // Update the state with the new list of products
    setProducts([...workingProducts]);
  }, [inventory]); // Dependency array: runs the effect whenever 'inventory' changes
  return (
    <ul className="ProductList">
      {products.map((product) => {
        return (
          <ProductCard
            product={product}
            key={product.baseName}
            description={product.baseDescription}
            handleAddItemToCart={handleAddItemToCart}
          />
        );
      })}
    </ul>
  );
}

export default ProductList;
