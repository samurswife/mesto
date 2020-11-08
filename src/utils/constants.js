export const popupSelectors = {
  popupPreviewSelector: ".popup_preview",
  popupUserInfoFormSelector: ".popup_edit-form",
  popupAddCardFormSelector: ".popup_add-form"
};

export const buttonSelectors = {
  profileEditButton: document.querySelector(".profile__edit-button"),
  addPhotoButton: document.querySelector(".profile__add-button"),
  addCardButton: document.querySelector(".popup__form-button_add")
};

export const formSelectors = {
  editForm: document.querySelector(".popup__form_edit"),
  addForm: document.querySelector(".popup__form_add")
};

export const inputSelectors = {
  formNameInput: document.querySelector(".popup__form-input_name"),
  formAboutInput: document.querySelector(".popup__form-input_about")
};

export const profileElementsSelectors = {
  profileName: ".profile__name",
  profileAbout: ".profile__about",
  profileAvatar: ".profile__avatar"
};

export const cardsContainer = document.querySelector('.elements');

export const cardConfig = {
  cardTemplate: "#cards"
};

export const formConfig = {
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__form-button_disabled",
  inputErrorClass: "popup__form-input_type_error",
  errorClass: "popup__form-input-error_active"
};
