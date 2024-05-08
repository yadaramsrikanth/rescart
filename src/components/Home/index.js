import {Component} from 'react'

import TabItem from '../TabItem'
import DishItem from '../DishItem'
import Header from '../Header'

import './index.css'

class Home extends Component {
  state = {resName: '', categoryId: '', dishItemsList: [], cartItems: []}

  componentDidMount() {
    this.getDetails()
  }

  addItemtoCart = dish => {
    const {cartItems} = this.state
    const isAlreadyExists = cartItems.find(item => item.dishId === dish.dishId)
    // console.log(isAlreadyExists)
    if (!isAlreadyExists) {
      const newDish = {...dish, quantity: 1}
      this.setState(prevState => ({
        cartItems: [...prevState.cartItems, newDish],
      }))
    } else {
      this.setState(prevState => ({
        cartItems: prevState.cartItems.map(eachDish => {
          if (eachDish.dishId === dish.dishId) {
            return {...eachDish, quantity: eachDish.quantity + 1}
          }
          return eachDish
        }),
      }))
    }
  }

  removeItemfromCart = dish => {
    const {cartItems} = this.state
    //  console.log(cartItems)
    const isAlreadyExists = cartItems.find(item => item.dishId === dish.dishId)
    if (isAlreadyExists.quantity > 0) {
      this.setState(prevState => ({
        cartItems: prevState.cartItems.map(eachDish => {
          if (eachDish.dishId === dish.dishId) {
            return {...eachDish, quantity: eachDish.quantity - 1}
          }
          return eachDish
        }),
      }))
    }
  }

  getDetails = async () => {
    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const fetchedData = await fetch(url)
    const responseData = await fetchedData.json()

    const array = responseData.map(each => ({
      restaurantName: each.restaurant_name,
      tablemenuList: each.table_menu_list,
    }))

    const {restaurantName, tablemenuList} = array[0]

    const formattedData = tablemenuList.map(each => ({
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
      menuCategoryImage: each.menu_category_image,
      categoryDishes: each.category_dishes.map(each1 => ({
        dishId: each1.dish_id,
        dishName: each1.dish_name,
        dishAvailability: each1.dish_Availability,
        dishCurrency: each1.dish_currency,
        dishType: each1.dish_Type,
        dishCalories: each1.dish_calories,
        dishImage: each1.dish_image,
        dishPrice: each1.dish_price,
        dishDescription: each1.dish_description,
        nexturl: each1.nexturl,
        addonCat: each1.addonCat,
      })),
    }))
    this.setState({
      resName: restaurantName,
      categoryId: formattedData[0].menuCategoryId,
      dishItemsList: formattedData,
    })
  }

  updateCategoryId = id => {
    this.setState({categoryId: id})
  }

  getFiltredDishes = () => {
    const {dishItemsList, categoryId} = this.state
    const filterdata = dishItemsList.filter(
      each => each.menuCategoryId === categoryId,
    )
    return filterdata
  }

  render() {
    const data = this.getFiltredDishes()

    // console.log(data)
    const {resName, dishItemsList, categoryId, cartItems} = this.state

    return (
      <div className="main-bg-container">
        <Header resName={resName} cartItems={cartItems} />
        <ul className="tab-item-container">
          {dishItemsList.map(eachItem => (
            <TabItem
              eachItem={eachItem}
              key={eachItem.menuCategoryId}
              updateCategoryId={this.updateCategoryId}
              isActive={categoryId === eachItem.menuCategoryId}
            />
          ))}
        </ul>

        <ul className="category-dishes-container">
          {data.map(each =>
            each.categoryDishes.map(dishDetails => (
              <DishItem
                dishDetails={dishDetails}
                key={dishDetails.dishId}
                cartItems={cartItems}
                addItemtoCart={this.addItemtoCart}
                removeItemfromCart={this.removeItemfromCart}
              />
            )),
          )}
        </ul>
      </div>
    )
  }
}

export default Home

/* 

else {
      const filteredItems = cartItems.filter(
        eachItem => eachItem.dishId !== dish.dishId,
      )
      this.setState({cartItems: filteredItems})
    }
*/
