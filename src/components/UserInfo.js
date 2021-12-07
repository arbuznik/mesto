export default class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._userNameElement = document.querySelector(nameSelector);
    this._aboutUserElement = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    return { 
      name: this._userNameElement.textContent,
      about: this._aboutUserElement.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._userNameElement.textContent = name;
    this._aboutUserElement.textContent = about;
  }
}