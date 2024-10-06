import React, { useState } from 'react'
import './ProductForm.css'
const ProductForm = (props) => {
    const [productId, setProductId] = useState('');
    const [price, setPrice] = useState('');
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();
        props.getData(productId,price,productName,category);
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className='form' >
                <label htmlFor='product_id'>Product Id: </label>
                <input type='number' id='product_id' value={productId}
                    onChange={(e) => (setProductId(e.target.value))} />
                <label htmlFor='price'>Selling Price: </label>
                <input type='number' id='price' value={price}
                onChange={(e)=>(setPrice(e.target.value))} />
                <label htmlFor='product_name'>Product Name: </label>
                <input type='text' id='product_name' value={productName} 
                onChange={ (e)=> setProductName(e.target.value)}/>
                <label htmlFor='category'>Choose a Category: </label>
                <select id='category' onChange={(e)=> setCategory(e.target.value)}>
                    <option value='Electronics'>Electronics</option>
                    <option value='Food'>Food</option>
                    <option value='Skincare'>Skincare</option>
                </select>
                <button type='submit'>Add Product</button>
            </form>
        </div>
    )
}

export default ProductForm
