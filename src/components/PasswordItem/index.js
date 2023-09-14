import './index.css'

const PasswordItem = props => {
  const {passwordItemList, isPasswordVisible, onDeletePasswordItem} = props
  const {
    id,
    website,
    username,
    password,
    firstLetter,
    profileClassName,
  } = passwordItemList

  const deletePasswordItem = () => {
    onDeletePasswordItem(id)
  }

  return (
    <li className="password-item-card">
      <p className={`profile ${profileClassName}`}>{firstLetter}</p>
      <div className="wup-display-container">
        <p className="wup website-name">{website}</p>
        <p className="wup user-name">{username}</p>
        <p className="wup password">
          {isPasswordVisible ? (
            password
          ) : (
            <img
              width={120}
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
            />
          )}
        </p>
      </div>
      <button
        className="delete-btn"
        type="button"
        onClick={deletePasswordItem}
        data-testid="delete"
      >
        <img
          width={25}
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
