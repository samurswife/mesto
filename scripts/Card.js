import {openPopup, popupPreview} from "./index.js";

class Card {
  constructor(name, link, templateSelector){
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector(".element").cloneNode(true);
  }

  createCard() {
    this._card = this._getTemplate();

    this._card.querySelector('.element__title').textContent = this._name;
    this._card.querySelector('.element__image').style.backgroundImage = 'url(' + this._link + ')';
    this._card.querySelector('.element__image').setAttribute("alt", this._name);

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
    e.target.closest(".element").remove();
  }

  _showPreview(e) {
    const element = e.target.closest(".element");
    const imageTitle = element.querySelector(".element__title").textContent;
    const bgImageUrl = e.target.style.backgroundImage;

    document.querySelector(".popup__image-title").textContent = imageTitle;
    document.querySelector(".popup__image").setAttribute("src", bgImageUrl.slice((bgImageUrl.indexOf("\"") + 1), -2));
    document.querySelector(".popup__image").setAttribute("alt", imageTitle);

    openPopup(popupPreview);
  }
}

export default Card;
