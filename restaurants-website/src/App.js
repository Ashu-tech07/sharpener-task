
import { useState } from 'react';
import './App.css';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const showCartHandler = () => {
    setIsCartOpen(true);
  };
  const hideCartHandler = () => {
    setIsCartOpen(false);
  };
  return (
    <>
     {isCartOpen && <Cart  hideCartHandler={hideCartHandler}/>}
    <Header showCartHandler={showCartHandler} />
    <main>
      <Meals/>
    </main>
    </>
  );
}

export default App;
