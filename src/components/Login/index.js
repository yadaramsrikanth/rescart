import Cookies from 'js-cookie'
import {Component} from 'react'

import './index.css'

class Login extends Component {
  state = {userName: '', passWord: '', showSubmitError: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    const {userName, passWord} = this.state
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username: userName, password: passWord}
    const options = {method: 'POST', body: JSON.stringify(userDetails)}
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passWord: event.target.value})
  }

  render() {
    const {showSubmitError, errorMsg, passWord, userName} = this.state

    return (
      <div className="login-main-bg-container">
        <div className="login-page-container">
          <h1 className="restaurant-name">UNI RESTO CAFE</h1>
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <label className="label-element" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              className="input-element"
              placeholder="USERNAME"
              id="username"
              onChange={this.onChangeUserName}
              value={userName}
            />

            <label className="label-element" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              className="input-element"
              placeholder="PASSWORD"
              id="password"
              onChange={this.onChangePassword}
              value={passWord}
            />
            <button className="login-button" type="submit">
              Login
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
