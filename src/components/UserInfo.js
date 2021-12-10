export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarClass, avatarContainerSelector }) {
    this._userNameElement = document.querySelector(nameSelector);
    this._aboutUserElement = document.querySelector(aboutSelector);
    this._avatarClass = avatarClass;
    this._avatarContainerSelector = document.querySelector(avatarContainerSelector);
  }

  getUserInfo() {
    return { 
      name: this._userNameElement.textContent,
      about: this._aboutUserElement.textContent,
    };
  }

  setUserInfo({ name, about, _id, avatar }) {
    this._userNameElement.textContent = name;
    this._aboutUserElement.textContent = about;
    this._userId = _id;
  }

  getUserId() {
    return this._userId;
  }

  renderUserAvatar({ name, avatar}) {
    this._avatarUserElement = document.createElement('img');
    this._avatarUserElement.classList.add(this._avatarClass)
    this._avatarUserElement.src = avatar;
    this._avatarUserElement.alt = name;
    this._avatarContainerSelector.prepend(this._avatarUserElement)
  }

  removeAvatar() {
    this._avatarUserElement.remove();
  }
}