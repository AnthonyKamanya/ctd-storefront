import { useEffect, useState } from 'react';
import inventoryData from './assets/catalog.json';
import './App.css';
import Header from './Header';
import ProductList from './ProductList';

function App() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    setInventory([...inventoryData.inventory]);
  }, []);
  const [cart, setCart] = useState([]);

  function handleAddItemToCart(id) {
    const target = inventory.find((item) => item.id === id);

    if (!target) {
      console.error('cart error: item not found');
      return;
    }

    const cartItem = { ...target, cartItemId: Date.now() };
    console.log(cartItem);
    setCart([...cart, cartItem]);
  }
  function addItemToCart(item) {
    setCart([...cart, item]);
  }

  function removeItemFromCart(id) {
    const updatedCart = cart.filter((item) => !item.id === id);
    setCart([...updatedCart]);
  }

  return (
    <main className="App">
      <Header cart={cart}/>
      <ProductList
        inventory={inventory}
        handleAddItemToCart={handleAddItemToCart}
      ></ProductList>
    </main>
  );
}

export default App;
