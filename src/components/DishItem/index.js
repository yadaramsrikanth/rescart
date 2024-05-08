import {useState, useContext} from 'react'

import './index.css'
import CartContext from '../../context/CartContext'

const DishItem = props => {
  const {dishDetails, addItemtoCart, removeItemfromCart, cartItems} = props
  const {
    dishId,
    dishName,
    dishAvailability,
    dishCurrency,

    dishCalories,
    dishImage,
    dishPrice,
    dishDescription,
    addonCat,
  } = dishDetails

  const {addCartItem} = useContext(CartContext)
  const [quantity, setQuantity] = useState(0)

  const onClickaddToCart = () => {
    addCartItem({...dishDetails, quantity})
  }

  const decrementQuantity = () => {
    setQuantity(prevState => (prevState > 0 ? prevState - 1 : 0))
  }

  const incrementQuantity = () => {
    setQuantity(prevState => prevState + 1)
  }

  return (
    <li className="dishItem-card">
      <div className="dish-item-details-container">
        <h1 className="dish-name">{dishName}</h1>
        <p className="dish-currency-price">
          {dishCurrency} {dishPrice}
        </p>
        <p className="description">{dishDescription}</p>
        {dishAvailability ? (
          <div className="button-container">
            <button
              type="button"
              className="minus-button"
              onClick={decrementQuantity}
            >
              -
            </button>
            <p className="value">{quantity}</p>
            <button
              type="button"
              className="minus-button"
              onClick={incrementQuantity}
            >
              +
            </button>
          </div>
        ) : (
          <p className="not-available">Not available</p>
        )}
        {addonCat.length !== 0 && (
          <p className="add-on-cat">Customizations available</p>
        )}
      </div>
      <p className="calories">{dishCalories} calories</p>
      {dishAvailability && (
        <button
          className="add-to-cart-button"
          type="button"
          onClick={onClickaddToCart}
        >
          ADD TO CART
        </button>
      )}
      <img src={dishImage} alt={dishName} className="image" />
    </li>
  )
}

export default DishItem
