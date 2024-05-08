import {useContext} from 'react'

import CartContext from '../../context/CartContext'

import CartItem from '../CartItem'

import Header from '../Header'

const CartDetails = () => {
  const {cartList, removeAllCartItems} = useContext(CartContext)

  const clicktoEmptyCart = () => {
    removeAllCartItems()
  }

  const renderEmptyView = () => (
    <div className="empty-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="empty view"
      />
      <p className="empty-view">Your Cart Is Empty..</p>
    </div>
  )

  const renderCartItems = () => (
    <div className="items-container">
      <h1 className="cart-items-heading">Cart Items</h1>
      <button
        className="remove-button"
        type="button"
        onClick={clicktoEmptyCart}
      >
       Remove All
      </button>
      <ul className="cartitemsList-container">
        {cartList.map(eachItem => (
          <CartItem key={eachItem.dishId} eachItem={eachItem} />
        ))}
      </ul>
    </div>
  )

  return (
    <div className="main-cart-container">
      <Header />

      <div className="display-items-container">
        {cartList.length === 0 ? renderEmptyView() : renderCartItems()}
      </div>
    </div>
  )
}

export default CartDetails
