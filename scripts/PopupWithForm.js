import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }){
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues(){
    this._inputList = this._popup.querySelectorAll(".popup__form-input");
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners(){
    super.setEventListeners();
    this._popup.querySelector(".popup__form").addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close(){
    super.close();
    this._popup.querySelector(".popup__form").reset();
  }
}
