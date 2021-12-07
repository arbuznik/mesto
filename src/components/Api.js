export default class Api {
  constructor({ baseUrl, headers }, setUserInfo) {
    this._url = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    // ...
  }

  getUserInfo() {
    return fetch(this._url + '/users/me', {
      headers: this._headers
    })
  }
}