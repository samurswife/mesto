export default class Card {
  constructor({card, templateSelector, handleCardClick, handleDeleteIconClick, handleLikeClick, userId}){
    this._userId = userId;
    this._name = card.name;
    this._link = card.link;
    this._likes = card.likes;
    this._id = card._id;
    this._owner = card.owner;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector(".element").cloneNode(true);
  }

  createCard() {
    this._card = this._getTemplate();

    this._cardImage = this._card.querySelector('.element__image');
    this._cardTitle = this._card.querySelector('.element__title');
    this._cardLikes = this._card.querySelector('.element__like-counter');

    this._cardTitle.textContent = this._name;
    this._cardImage.style.backgroundImage = `url(${this._link})`;
    this._cardImage.setAttribute("alt", this._name);
    this._cardLikes.textContent = this._likes.length;

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    this._card.querySelector(".element__like-button").addEventListener('click', (e) => this._handleLikeClick(e, this));

    this._card.querySelector(".element__delete-button").addEventListener('click', (e) => this._handleDeleteIconClick(this));

    this._card.querySelector(".element__image").addEventListener('click', (e) => this._handleCardClick(e));
  }

  increaseLikes(e, likes){
    this._cardLikes.textContent = likes;
    e.target.classList.add("element-like-button_active");
  }

  decreaseLikes(e, likes){
    this._cardLikes.textContent = likes;
    e.target.classList.remove("element-like-button_active");
  }

  removeCard(e) {
    this._card.remove();
    this._card = null;
  }
}
