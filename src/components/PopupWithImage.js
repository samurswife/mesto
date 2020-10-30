import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupImageTitle = this._popup.querySelector(".popup__image-title");
  }

  open(element){
    super.open();

    this._popupImageTitle.textContent = element.name;
    this._popupImage.setAttribute("src", element.link);
    this._popupImage.setAttribute("alt", element.name);
  }
}
