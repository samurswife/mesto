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
      console.log(err);
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
      console.log(err);
    })
  }

  updateUserInfo(user){
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: user.name,
        about: user.about
      })
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
      console.log(err);
    });
  }

  updateUserAvatar(link){
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link.avatar
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    // .then(data => {
    //   return data;
    // })
    .catch(err => {
      console.log(err);
    });
  }

  uploadNewCard(card){
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
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
      console.log(err);
    });
  }


}
