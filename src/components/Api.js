export default class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  loadUserInfo(handleOriginalResponse){
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers
    })
    .then(handleOriginalResponse)
    .then(data => {
      return data;
    })
    .catch(err => {
      console.log(err);
    })
  }

  loadInitialCards(handleOriginalResponse){
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers
    })
    .then(handleOriginalResponse)
    .then(data => {
      return data;
    })
    .catch(err => {
      console.log(err);
    })
  }

  updateUserInfo(user, handleOriginalResponse){
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: user.name,
        about: user.about
      })
    })
    .then(handleOriginalResponse)
    .then(data => {
      return data;
    })
    .catch(err => {
      console.log(err);
    });
  }

  updateUserAvatar(link, handleOriginalResponse){
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link.avatar
      })
    })
    .then(handleOriginalResponse)
    .catch(err => {
      console.log(err);
    });
  }

  uploadNewCard(card, handleOriginalResponse){
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
    .then(handleOriginalResponse)
    .then(data => {
      return data;
    })
    .catch(err => {
      console.log(err);
    });
  }

  deleteCard(card, handleOriginalResponse){
    return fetch(`${this._url}/cards/${card._id}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(handleOriginalResponse)
    .then(data => {
      return data;
    })
    .catch(err => {
      console.log(err);
    });
  }

  likeCard(card, handleOriginalResponse){
    return fetch(`${this._url}/cards/likes/${card._id}`, {
      method: "PUT",
      headers: this._headers,
    })
    .then(handleOriginalResponse)
    .then(data => {
      return data;
    })
    .catch(err => {
      console.log(err);
    });
  }

  dislikeCard(card, handleOriginalResponse){
    return fetch(`${this._url}/cards/likes/${card._id}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(handleOriginalResponse)
    .then(data => {
      return data;
    })
    .catch(err => {
      console.log(err);
    });
  }
}
