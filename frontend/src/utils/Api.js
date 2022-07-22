class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._credentials = options.credentials;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка даных: ${res.status}`)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: this._credentials
    })
      .then(res => this._checkResponse(res));
  }

  getInitialUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: this._credentials
    })
      .then(res => this._checkResponse(res))
  }

  getChangeAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: this._credentials,
      body: JSON.stringify(link)
    })
      .then(res => {console.log('api', res); this._checkResponse(res)})
  }

  getChangeUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: this._credentials,
      body: JSON.stringify(data)
    })
      .then(res => {console.log('api', res); this._checkResponse(res)})
  }

  getNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: this._credentials,
      body: JSON.stringify(data)
    })
      .then(res => this._checkResponse(res))
  }

  getDeleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      credentials: this._credentials,
    })
      .then(res => this._checkResponse(res))
  }

  getAddLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      credentials: this._credentials,
    })
      .then(res => this._checkResponse(res))
  }

  getRemoveLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      credentials: this._credentials,
    })
      .then(res => this._checkResponse(res))
  }
}

export const api = new Api({
  baseUrl: 'http://localhost:3000',
  credentials: 'include',
});