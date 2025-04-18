import { useEffect, useState } from 'react';
import inventoryData from './assets/catalog.json';
import './App.css';
import Header from './Header';
import ProductList from './ProductList';
import ProductCard from './ProductCard';

function App() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    setInventory([...inventoryData.inventory]);
  }, []);
  const [cart, setCart] = useState([]);
  function handleAddItemToCart(id) {
    const target = inventory.find((item) => item.id === id);
    //if no inventory items are found
    //we want to prevent the app from crashing
    //by exiting this function now
    if (!target) {
      console.error('cart error: item not found');
      return;
    }
    //create an new object, spread the contents of the item selected
    //and add a `cartItemId`
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

  function promoteItem() {
    return (
      <ProductCard
        name="Special Limited Edition Tee!"
        description="Special limited edition neon green shirt with a metallic 
        Code the Dream Logo shinier than the latest front-end framework! 
        Signed by the legendary Frank!"
      />
    );
  }
  return (
    <main className="App">
      <Header />
      <ProductList inventory={inventory}>{promoteItem()}</ProductList>
    </main>
  );
}

export default App;
