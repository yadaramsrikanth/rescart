import {useContext} from 'react'
import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => {
  const {eachItem} = props
  const {dishId, dishName, dishImage, dishPrice, quantity} = eachItem
  const {incrementCartItemQuantity, decrementCartItemQuantity, removeCartItem} =
    useContext(CartContext)

  const onclicktoremoveItem = () => removeCartItem(dishId)

  const onclicktoIncrementQuantity = () => incrementCartItemQuantity(dishId)

  const onclicktoDecrementQuantity = () => decrementCartItemQuantity(dishId)

  return (
    <li className="list-item-container">
      <div className="item-details">
        <img src={dishImage} alt={dishName} className="dish-Image" />
        <p className="item-description">{dishName}</p>
        <p className="item-description">{dishPrice}</p>
        <p className="item-description">Total: {quantity * dishPrice} /-</p>
      </div>
      <div className="incre-decre-button-container">
        <button
          type="button"
          className="plus-button"
          onClick={onclicktoDecrementQuantity}
        >
          -
        </button>
        <p className="quantity">{quantity}</p>
        <button
          type="button"
          className="plus-button"
          onClick={onclicktoIncrementQuantity}
        >
          +
        </button>
      </div>
      <button
        className="remove-button"
        type="button"
        onClick={onclicktoremoveItem}
      >
        Remove
      </button>
    </li>
  )
}

export default CartItem
