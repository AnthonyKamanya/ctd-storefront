import placeholder from './assets/placeholder.png';
import { useState } from 'react';

function Cart({ cart, handleCloseCart, setCart }) {
  const [workingCart, setWorkingCart] = useState(cart);
  const [isFormDirty, setIsFormDirty] = useState(false);

  function getWorkingCartPrice() {
    // using `.toFixed` because floating point arithmetic
    // introduces suprising rounding issues
    // eg: `console.log(.99 + .99 +.99)` will print 2.9699999999999998
    return workingCart
      .reduce((acc, item) => acc + item.price * item.itemCount, 0)
      .toFixed(2);
  }

  function handleUpdateField({ event, id }) {
    event.preventDefault();
    // prevent re-render if already dirty
    if (!isFormDirty) {
      setIsFormDirty(true);
    }
    const targetProduct = cart.find((item) => item.id === id);
    const targetIndex = cart.findIndex((item) => item.id === id);
    if (!targetProduct) {
      console.error('cart error: item not found');
      return;
    }
    //reject negative values or if user deletes value
    if (event.target.value < 0 || event.target.value === '') {
      return;
    }
    // create new object instead of updating old
    const updatedProduct = {
      ...targetProduct,
      itemCount: parseInt(event.target.value, 10),
    };
    //avoid re-ordering array when updating cart item
    setWorkingCart([
      ...workingCart.slice(0, targetIndex),
      updatedProduct,
      ...workingCart.slice(targetIndex + 1),
    ]);
  }
  function handleCancel(event) {
    event.preventDefault();
    //re-enables a user's ability to close out the cart.
    setIsFormDirty(false);
    //reset workingCart to the source of truth.
    setWorkingCart([...cart]);
  }
  function handleConfirm(event) {
    event.preventDefault();
    setCart(workingCart.target.value);
  }
  function removeEmptyItems(cart) {
    return cart.filter((i) => i.quantity !== 0);
  }

  return (
    <>
      <div className="cartScreen"></div>
      {/*
   .cartScreen covers the product list with
   a div that has a blur effect placed on it.
   this makes the product buttons unclickable
  */}
      <div className="cartListWrapper">
        {workingCart.length === 0 ? (
          <p>cart is empty</p>
        ) : (
          <form>
            <ul className="cartList">
              {workingCart.map((item) => {
                return (
                  <li className="cartListItem" key={item.id}>
                    <img src={placeholder} alt="" />
                    <h2>{item.baseName}</h2>
                    {item.variantName !== 'Default' ? (
                      <p>{item.variantName}</p>
                    ) : null}
                    <div className="cartListItemSubtotal">
                      <p>Count: {item.itemCount}</p>
                      <label>
                        Count:
                        <input
                          type="number"
                          value={item.itemCount}
                          onChange={(event) =>
                            handleUpdateField({ event, id: item.id })
                          }
                        />
                      </label>
                      <p>
                        Subtotal: £{(item.price * item.itemCount).toFixed(2)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
            {isFormDirty && (
              <div>
                <button onClick={handleConfirm}>Confirm Update</button>
                <button onClick={handleCancel}>Cancel Update</button>
              </div>
            )}
          </form>
        )}
        {/* cart total will need to be calculated */}
        <h2>Cart Total: £{getWorkingCartPrice() || 0}</h2>
        <button onClick={handleCloseCart}>CloseCart</button>
      </div>
    </>
  );
}

export default Cart;
