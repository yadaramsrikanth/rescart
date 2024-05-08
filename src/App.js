import {Component} from 'react'

import {BrowserRouter, Switch, Route} from 'react-router-dom'

import CartContext from './context/CartContext'

import Home from './components/Home'
import Login from './components/Login'
import CartDetails from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

import './App.css'

// write your code here

class App extends Component {
  state = {cartList: []}

  addCartItem = dish => {
    const {cartList} = this.state
    const dishAvailable = cartList.find(
      dishItem => dishItem.dishId === dish.dishId,
    )
    if (dishAvailable) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (eachItem.dishId === dish.dishId) {
            const updatedQuantity = eachItem.quantity + dish.quantity
            return {...eachItem, quantity: updatedQuantity}
          }
          return eachItem
        }),
      }))
    } else {
      const upatedCartList = [...cartList, dish]
      this.setState({cartList: upatedCartList})
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = dishId => {
    const {cartList} = this.state
    const filteredCart = cartList.filter(item => item.dishId !== dishId)
    this.setState({cartList: filteredCart})
  }
  incrementCartItemQuantity = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (eachItem.dishId === dishId) {
          const updatedQuantity = eachItem.quantity + 1
          return {...eachItem, quantity: updatedQuantity}
        }
        return eachItem
      }),
    }))
  }
  decrementCartItemQuantity = dishId => {
    const {cartList} = this.state
    const dishItemObject = cartList.find(eachItem => eachItem.dishId === dishId)
    if (dishItemObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (eachItem.dishId === dishId) {
            const updatedQuantity = eachItem.quantity - 1
            return {...eachItem, quantity: updatedQuantity}
          }
          return eachItem
        }),
      }))
    } else {
      this.removeCartItem(dishId)
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeAllCartItems: this.removeAllCartItems,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <BrowserRouter>
          <Switch>
            <ProtectedRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/cart" component={CartDetails} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}
export default App
