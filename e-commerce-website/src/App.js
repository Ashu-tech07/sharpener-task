
import './App.css';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartProvider from './components/store/CartProvider';

function App() {
  return (
   <CartProvider>
   <Header/>
   <ProductList/>
   
   </CartProvider>
  );
}

export default App;
