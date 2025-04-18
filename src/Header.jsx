import logo from './assets/react.svg';
import shoppingCart from './assets/shoppingCart.svg';
import { useEffect } from 'react';

function Header({cart}) {
  useEffect(() => {
    cart.forEach((item) => {
      console.log(item.baseName, item.cartItemId);
    });
    if (cart.length > 0) {
      console.log('--end of cart--');
    }
  });
  return (
    <div className="coming-soon">
      <h1>CTD Swag</h1>
      <div style={{ height: 100, width: 100 }}>
        <img src={logo} alt="Code The Dream Logo" />
      </div>
      <div className="shoppingCart">
        <img src={shoppingCart} alt="" />
      </div>
    </div>
  );
}

export default Header;
