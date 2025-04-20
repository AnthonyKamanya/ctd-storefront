function ProductCard({ name, description, product, handleAddItemToCart }) {
  return (
    <li>
      <div className="itemCard">
        <h2>{name}</h2>
        <p>{description}</p>
        <div className="productButtons">
          {product.variants.length > 1 ? (
            <button>Show Option</button>
          ) : (
            <button onClick={() => handleAddItemToCart(product.variants[0].id)}>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

export default ProductCard;
