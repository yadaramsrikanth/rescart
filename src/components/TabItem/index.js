import './index.css'

const TabItem = props => {
  const {eachItem, updateCategoryId, isActive} = props
  const {menuCategory, menuCategoryId} = eachItem

  const buttonClassName = isActive ? 'active-tab' : ''

  const onClickTabItem = () => {
    updateCategoryId(menuCategoryId)
  }

  return (
    <li>
      <button
        type="button"
        className={`tab-item-button ${buttonClassName}`}
        onClick={onClickTabItem}
      >
        {menuCategory}
      </button>
    </li>
  )
}

export default TabItem
