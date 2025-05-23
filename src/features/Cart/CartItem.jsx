import placeholder from '/src/assets/placeholder.png';

function CartItem({ item, onHandleItemUpdate }) {
  return (
    <li className="cartListItem">
      <img src={placeholder} alt="" />
      <h2>{item.baseName}</h2>
      {item.variantName !== 'Default' ? <p>{item.variantName}</p> : null}
      <div className="cartListItemSubtotal">
        <p>Count: {item.itemCount}</p>
        <label>
          Count:
          <input
            type="number"
            value={item.itemCount}
            onChange={(event) => onHandleItemUpdate({ event, id: item.id })}
          />
        </label>
        <p>Subtotal: £{(item.price * item.itemCount).toFixed(2)}</p>
      </div>
    </li>
  );
}
export default CartItem;
