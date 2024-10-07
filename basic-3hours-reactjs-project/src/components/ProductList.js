import React from 'react'
import './ProductList.css'

const ProductList = (props) => {

  const deleteData=()=>{
    props.onDelete(props.productId)
  }
  return (
    <div className='list'>
    <li>{props.price} - {props.category} - {props.productName} </li>
    <button className='list-btn' onClick={deleteData}>Delete Product</button>
    </div>
  )
}

export default ProductList
