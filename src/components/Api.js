export default class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(this._url + '/users/me', {
      headers: this._headers
    })
  }

  getInitialCards() {
    return fetch(this._url + '/cards', {
      headers: this._headers
    })
  }

  editUserInfo(userInfo) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(userInfo)
    })
  }

  addNewCard(cardContent) {
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(cardContent)
    })
  }

  deleteCard(cardId) {
    return fetch(this._url + '/cards/' + cardId, {
      method: 'DELETE',
      headers: this._headers
    })
  }
}