export default class UserInfo {
  constructor(nameSelector, aboutSelector) {
    this._userNameElement = document.querySelector(nameSelector);
    this._aboutUserElement = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    return { 
      userName: this._userNameElement.textContent,
      aboutUser: this._aboutUserElement.textContent,
    };
  }

  setUserInfo({ userName, aboutUser }) {
    this._userNameElement.textContent = userName;
    this._aboutUserElement.textContent = aboutUser;
  }
}