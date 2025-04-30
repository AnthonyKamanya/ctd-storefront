import { useEffect, useState } from 'react';
import inventoryData from './catalog.json';
import './App.css';
import Header from './shared/Header.jsx';
import ProductList from './features/ProductList/ProductList.jsx';
import Cart from './features/Cart/Cart.jsx';
import Footer from './shared/Footer.jsx';

function App() {
  const [inventory, setInventory] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    async () => {
      try {
        const resp = await fetch(`${baseURL}/products`);
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        const products = await resp.json();
        console.log(products);
        setInventory([...products]);
      } catch (error) {
        console.error(error);
      }
    };
  }, []);

  function handleCloseCart() {
    //prevents re-render if unchanged
    if (isCartOpen) {
      setIsCartOpen(false);
    }
  }

  function handleOpenCart() {
    //prevents re-render if unchanged
    if (!isCartOpen) {
      setIsCartOpen(true);
    }
  }

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

  function handleAddItemToCart(id) {
    const inventoryItem = inventory.find((item) => item.id === id);
    if (!inventoryItem) {
      console.error('cart error: item not found');
      return;
    }
    const itemToUpdate = cart.find((item) => item.id === id);
    let updatedCartItem;
    if (itemToUpdate) {
      updatedCartItem = {
        ...itemToUpdate,
        itemCount: itemToUpdate.itemCount + 1,
      };
    } else {
      updatedCartItem = { ...inventoryItem, itemCount: 1 };
    }
    setCart([...cart.filter((item) => item.id !== id), updatedCartItem]);
  }

  return (
    <>
      <Header cart={cart} handleOpenCart={handleOpenCart} />
      <main className="App">
        <ProductList
          inventory={inventory}
          handleAddItemToCart={handleAddItemToCart}
        ></ProductList>
        {/*`isCartOpen has to be true for the cart to be rendered*/}
        {isCartOpen && (
          <Cart
            cart={cart}
            setCart={setCart}
            handleCloseCart={handleCloseCart}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
