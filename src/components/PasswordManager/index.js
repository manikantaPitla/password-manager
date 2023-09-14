import {Component} from 'react'
import {v4} from 'uuid'
import './index.css'
import PasswordItem from '../PasswordItem'

const passwordsList = []

const profileBgClasses = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordItemList: passwordsList,
    isPasswordVisible: false,
    searchInput: '',
  }

  onChangeWebsiteInput = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsernameInput = event => {
    this.setState({username: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({password: event.target.value})
  }

  showOrHidePw = () => {
    this.setState(prevState => ({
      isPasswordVisible: !prevState.isPasswordVisible,
    }))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onDeletePasswordItem = id => {
    this.setState(prevState => ({
      passwordItemList: prevState.passwordItemList.filter(
        each => each.id !== id,
      ),
    }))
  }

  onSubmit = event => {
    event.preventDefault()

    const {website, username, password} = this.state

    const profileClassName =
      profileBgClasses[Math.ceil(Math.random() * profileBgClasses.length - 1)]

    const passwordItem = {
      id: v4(),
      website,
      username,
      password,
      firstLetter: username[0].toUpperCase(),
      profileClassName,
    }

    this.setState(prevState => ({
      passwordItemList: [...prevState.passwordItemList, passwordItem],
      website: '',
      username: '',
      password: '',
    }))
  }

  render() {
    const {
      website,
      username,
      password,
      passwordItemList,
      isPasswordVisible,
      searchInput,
    } = this.state

    const filteredPwList = passwordItemList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="main">
        <div className="manager-app">
          <img
            className="app-logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
          />
          <div className="input-card-container">
            <form className="form">
              <h1 className="add-pw-heading">Add New Password</h1>
              <div className="input-container">
                <img
                  className="input-image"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                />
                <input
                  className="input-field"
                  type="text"
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsiteInput}
                  value={website}
                />
              </div>
              <div className="input-container">
                <img
                  className="input-image"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                />
                <input
                  className="input-field"
                  type="text"
                  placeholder="Enter Username"
                  onChange={this.onChangeUsernameInput}
                  value={username}
                />
              </div>
              <div className="input-container">
                <img
                  className="input-image"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                />
                <input
                  className="input-field"
                  type="password"
                  placeholder="Enter Password"
                  onChange={this.onChangePasswordInput}
                  value={password}
                />
              </div>
              <button
                type="submit"
                className="submit-btn"
                onClick={this.onSubmit}
              >
                Add
              </button>
            </form>
            <img
              className="pw-manager-img"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
            />
          </div>
          <div className="pw-manage-card-container">
            <div className="pw-count-search-container">
              <div className="pw-count-container">
                <h1 className="your-name-title"> Your Passwords</h1>
                <p className="passwords-count">{passwordItemList.length}</p>
              </div>
              <div className="search-container">
                <img
                  className="search-image"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                />
                <input
                  className="search-input-field"
                  type="search"
                  placeholder="Search"
                  onChange={this.onChangeSearchInput}
                />
              </div>
            </div>
            <div className="show-pw-container">
              <input
                className="check-box"
                type="checkbox"
                id="pwShow"
                onChange={this.showOrHidePw}
              />
              <label className="show-pw-text" htmlFor="pwShow">
                Show passwords
              </label>
            </div>

            {filteredPwList.length > 0 ? (
              <ul className="pw-manager-list-container">
                {filteredPwList.map(each => (
                  <PasswordItem
                    key={each.id}
                    passwordItemList={each}
                    isPasswordVisible={isPasswordVisible}
                    onDeletePasswordItem={this.onDeletePasswordItem}
                  />
                ))}
              </ul>
            ) : (
              <ul className="no-pw-image-container">
                <li>
                  <img
                    className="no-pw-img"
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                  />
                </li>
                <p>No Passwords</p>
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
