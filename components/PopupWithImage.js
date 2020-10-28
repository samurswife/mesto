import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector);
  }

  open(element){
    super.open();
    const popupImage = this._popup.querySelector(".popup__image");
    const popupImageTitle = this._popup.querySelector(".popup__image-title");

    popupImageTitle.textContent = element.name;
    popupImage.setAttribute("src", element.link);
    popupImage.setAttribute("alt", element.name);
  }
}
