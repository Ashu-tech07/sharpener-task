
import './App.css';
import ProductForm from './components/ProductForm';
import { useState } from 'react';
import ProductList from './components/ProductList';

function App() {
  const [products,setProducts]=useState([])

  const dataHandler=(id,price,pName,category)=>{
    setProducts((prevState)=>{
      return [...prevState, { productId:id, price:price, productName:pName, category:category}]
    })
  }

  const filteredData=(category)=>{
    const filterData= products.filter(element=>{
      return element.category===category;
    })

    return filterData;
  }

  return (
    <div className="App">
    <ProductForm getData={dataHandler} />

      <div className='list-item'><h3>Electronics</h3></div>
      <div className="show_item">
        {filteredData("Electronics").map(ele => <ProductList price={ele.price}  productName={ele.productName}  category={ele.category}/>)}
      </div>

      <div className='list-item'><h3>Food</h3></div>
      <div className="show_item">
        {filteredData("Food").map(ele => <ProductList price={ele.price}  productName={ele.productName}  category={ele.category}/>)}
      </div>

      <div className='list-item'><h3>Skincare</h3></div>
      <div className="show_item">
        {filteredData("Skincare").map(ele => <ProductList price={ele.price}  productName={ele.productName}  category={ele.category}/>)}
      </div>

    </div>
  );
}

export default App;
