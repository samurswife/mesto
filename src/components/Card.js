export default class Card {
  constructor({card, templateSelector, handleCardClick, handleDeleteIconClick}){
    this._name = card.name;
    this._link = card.link;
    this._likes = card.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector(".element").cloneNode(true);
  }

  createCard() {
    this._card = this._getTemplate();

    const cardImage = this._card.querySelector('.element__image');
    const cardTitle = this._card.querySelector('.element__title');
    const cardLikes = this._card.querySelector('.element__like-counter');

    cardTitle.textContent = this._name;
    cardImage.style.backgroundImage = `url(${this._link})`;
    cardImage.setAttribute("alt", this._name);
    cardLikes.textContent = this._likes.length;

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    this._card.querySelector(".element__like-button").addEventListener('click', (e) => this._like(e));

    // this._card.querySelector(".element__delete-button").addEventListener('click', (e) => this._deleteCard(e));
    this._card.querySelector(".element__delete-button").addEventListener('click', (e) => this._handleDeleteIconClick(e));

    this._card.querySelector(".element__image").addEventListener('click', (e) => this._handleCardClick(e));
  }

  _like(e) {
    e.target.classList.toggle("element-like-button_active");
  }

  _deleteCard(e) {
    this._card.remove();
    this._card = null;
  }
}
