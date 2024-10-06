import React from 'react'
import './ProductList.css'

const ProductList = (props) => {
  return (
    <div className='list'>
    <li>{props.price} - {props.category} - {props.productName} </li>
    <button className='list-btn'>Delete Product</button>
    </div>
  )
}

export default ProductList
