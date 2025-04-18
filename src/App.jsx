import { useState } from 'react';
import inventoryData from './assets/catalog.json';
import './App.css';
import logo from './assets/react.svg'

function App() {
  const [inventory, setInventory] = useState(inventoryData.inventory);
  return (
    <main>
      <div className="coming-soon">
        <h1>CTD Swag</h1>
        <div style={{ height: 100, width: 100 }}>
          <img src={logo} alt="Code The Dream Logo" />
        </div>
      </div>
      <ul>
        {inventory.map((item) => {
          return (
            <li key={item.id}>
              <div className="itemCard">
                <h2>{item.baseName}</h2>
                <p>{item.baseDescription}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default App;
