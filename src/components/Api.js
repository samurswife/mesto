export default class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  loadUserInfo(){
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => {
      return data;
    })
    .catch(err => {
      alert(err);
    })
  }

  loadInitialCards(){
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => {
      return data;
    })
    .catch(err => {
      alert(err);
    })
  }
}
