import {openPopup, popupPreview} from "./utils.js";

class Card {
  constructor(card, templateSelector){
    this._name = card.name;
    this._link = card.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector(".element").cloneNode(true);
  }

  createCard() {
    this._card = this._getTemplate();

    const cardImage = this._card.querySelector('.element__image');
    const cardTitle = this._card.querySelector('.element__title');

    cardTitle.textContent = this._name;
    cardImage.style.backgroundImage = `url(${this._link})`;
    cardImage.setAttribute("alt", this._name);

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    this._card.querySelector(".element__like-button").addEventListener('click', (e) => {
      this._like(e);
    });

    this._card.querySelector(".element__delete-button").addEventListener('click', (e) => {
      this._deleteCard(e);
    });

    this._card.querySelector(".element__image").addEventListener('click', (e) => {
      this._showPreview(e);
    });
  }

  _like(e) {
    e.target.classList.toggle("element-like-button_active");
  }

  _deleteCard(e) {
    this._card.remove();
    this._card = null;
  }

  _showPreview(e) {
    const imageTitle = this._card.querySelector(".element__title").textContent;
    const bgImageUrl = e.target.style.backgroundImage;
    const popupImage = document.querySelector(".popup__image");
    const popupImageTitle = document.querySelector(".popup__image-title");

    popupImageTitle.textContent = imageTitle;
    popupImage.setAttribute("src", bgImageUrl.slice((bgImageUrl.indexOf("\"") + 1), -2));
    popupImage.setAttribute("alt", imageTitle);

    openPopup(popupPreview);
  }
}

export default Card;
