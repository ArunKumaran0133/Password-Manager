import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './App.css'

const colorList = ['blue', 'red', 'yellow', 'green', 'orange']

class App extends Component {
  state = {
    initialList: [],
    isShow: false,
    isTrue: false,
    website: '',
    userName: '',
    password: '',
    searchInput: '',
  }

  websiteInput = event => {
    this.setState({website: event.target.value})
  }

  userNameInput = event => {
    this.setState({userName: event.target.value})
  }

  passwordInput = event => {
    this.setState({password: event.target.value})
  }

  addPassword = event => {
    event.preventDefault()
    const {website, userName, password} = this.state
    const websiteFirstLetter = website[0].toUpperCase()
    const classValues = colorList[Math.floor(Math.random() * 5)]
    const newValue = {
      id: uuidv4(),
      websiteFirstLetter,
      classValues,
      userName,
      password,
      website,
    }

    this.setState(prevState => ({
      initialList: [...prevState.initialList, newValue],
      website: '',
      userName: '',
      password: '',
      searchInput: '',
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  searchList = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteItem = id => {
    const {initialList} = this.state
    const newList = initialList.filter(eachItem => eachItem.id !== id)
    const caseOf = newList.length !== 0
    this.setState({initialList: newList, isTrue: caseOf})
  }

  render() {
    const {
      initialList,
      userName,
      password,
      website,
      searchInput,
      isShow,
    } = this.state
    let {isTrue} = this.state

    const newList = initialList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="main-bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="top-bg-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-image"
          />
          <form className="form-container" onSubmit={this.addPassword}>
            <h1 className="add-password-heading">Add New Password</h1>
            <div className="input-label-container">
              <button type="button" className="input-image">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="label-image"
                />
              </button>
              <input
                type="text"
                className="input-top"
                placeholder="Enter Website"
                onChange={this.websiteInput}
                value={website}
              />
            </div>
            <div className="input-label-container">
              <button type="button" className="input-image">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="label-image"
                />
              </button>
              <input
                type="text"
                className="input-top"
                placeholder="Enter Username"
                onChange={this.userNameInput}
                value={userName}
              />
            </div>
            <div className="input-label-container">
              <button type="button" className="input-image">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="label-image"
                />
              </button>
              <input
                type="password"
                className="input-top"
                placeholder="Enter Password"
                onChange={this.passwordInput}
                value={password}
              />
            </div>
            <div className="add-btn-container">
              <button type="submit" className="submit-button">
                Add
              </button>
            </div>
          </form>
        </div>
        <div className="bottom-bg-container">
          <div className="input-yourPasswords-container">
            <div className="password-text-count">
              <h1 className="bottom-heading">Your Passwords</h1>
              <p className="count-of-password">{newList.length}</p>
            </div>
            <div className="input-label-container">
              <button type="button" className="bottom-input-image">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="label-image"
                />
              </button>
              <input
                type="search"
                className="input-bottom"
                placeholder="Search"
                value={searchInput}
                onChange={this.searchList}
              />
            </div>
          </div>
          <hr />
          <div className="checkbox-input-label-container">
            <input
              type="checkbox"
              id="checkBocId"
              className="check-box-input"
              onChange={this.showPassword}
            />
            <label htmlFor="checkBocId" className="show-password-text">
              Show passwords
            </label>
          </div>
          {isTrue && (
            <ul className="list-container">
              {newList.map(eachItem => (
                <li
                  className="item-container"
                  id={eachItem.id}
                  key={eachItem.id}
                >
                  <button
                    type="button"
                    className={`First-Letter ${eachItem.classValues}`}
                  >
                    {eachItem.websiteFirstLetter}
                  </button>
                  <div>
                    <p className="password-text">{eachItem.website}</p>
                    <p className="password-text">{eachItem.userName}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                        className="star-password-image"
                      />
                    )}
                    {isShow && (
                      <p className="password-text">{eachItem.password}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => this.deleteItem(eachItem.id)}
                    data-testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="delete-image"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
          {!isTrue && (
            <div className="no-passwords-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-passwords-image"
              />
              <p className="no-passwords-text">No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App
