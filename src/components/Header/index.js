import {useContext} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {HiOutlineShoppingCart} from 'react-icons/hi'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  const {resName, cartItems} = props

  const {cartList} = useContext(CartContext)

  const onClickToLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <Link to="/" className="link-item">
        <h1>{resName}</h1>
      </Link>
      <div className="cart-container">
        <p className="orders">My Orders</p>
        <Link to="/cart" className="link-item">
          <HiOutlineShoppingCart size={30} />
        </Link>

        <p className="cart-count">{cartList.length}</p>
        <button
          className="log-out-button"
          type="button"
          onClick={onClickToLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
