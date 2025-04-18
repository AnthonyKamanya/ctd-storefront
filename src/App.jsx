import { useState } from 'react';
import inventoryData from './assets/catalog.json';
import './App.css';
import Header from './Header';
import ProductList from './ProductList';
import ProductCard from './ProductCard';

function App() {
  const [inventory, setInventory] = useState(inventoryData.inventory);

  function promoteItem() {
    return (
      <ProductCard
        name="Limited Edition Tee!"
        description="Special limited edition neon green shirt with a metallic 
        Code the Dream Logo shinier than the latest front-end framework! 
        Signed by the legendary Frank!"
      />
    );
  }
  return (
    <main>
      <Header />
      <ProductList inventory={inventory} >{promoteItem()}</ProductList>
    </main>
  );
}

export default App;
