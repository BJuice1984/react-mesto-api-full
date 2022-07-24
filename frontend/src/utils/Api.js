class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._credentials = options.credentials;
    this._headers = options.headers;
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

  setChangeAvatar(data) {
    console.log(data.avatar);
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({ avatar: data.avatar })
    })
      .then(res => this._checkResponse(res))
  }

  setChangeUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({ name: data.name, about: data.about })
    })
      .then(res => this._checkResponse(res))
  }

  setNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({ name: data.name, link: data.link })
    })
      .then(res => this._checkResponse(res))
  }

  setDeleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      credentials: this._credentials,
    })
      .then(res => this._checkResponse(res))
  }

  setAddLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      credentials: this._credentials,
    })
      .then(res => this._checkResponse(res))
  }

  setRemoveLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      credentials: this._credentials,
    })
      .then(res => this._checkResponse(res))
  }
}

export const api = new Api({
  baseUrl: 'https://api.mesto.bjuice.nomoredomains.xyz',
  credentials: 'include',
  headers: {'Content-Type': 'application/json'}
});