export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._userNameElement = document.querySelector(nameSelector);
    this._aboutUserElement = document.querySelector(aboutSelector);
    this._userAvatarElement = document.querySelector(avatarSelector);
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
    this._userAvatarElement.src = avatar;
    this._userAvatarElement.alt = name;
  }

  getUserId() {
    return this._userId;
  }
}