import ProductCard from './ProductCard';

function ProductList({ inventory,handleAddItemToCart}) {
  return (
    <ul className="ProductList">
      
      {inventory.map((item) => {
        return (
          <ProductCard
            handleAddItemToCart={handleAddItemToCart}
            key={item.id}
            id={item.id}
            name={item.baseName}
            description={item.baseDescription}
          />
        );
      })}
    </ul>
  );
}

export default ProductList;
