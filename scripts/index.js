import {initialCards, cardConfig, formConfig} from './config.js';
import Card from './Card.js';
import FormValidator from "./FormValidator.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const addPhotoButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const popups = Array.from(document.querySelectorAll(".popup"));

const popupPreview = document.querySelector(".popup_preview");
const popupCloseButtonPreview = document.querySelector(".popup__close-button_preview");

const popupEditForm = document.querySelector(".popup_edit-form");
const editForm = document.querySelector(".popup__form_edit");
const formNameInput = document.querySelector(".popup__form-input_name");
const formAboutInput = document.querySelector(".popup__form-input_about");
const popupCloseButtonEdit = document.querySelector(".popup__close-button_edit");

const popupAddCardForm = document.querySelector(".popup_add-form");
const addForm = document.querySelector(".popup__form_add");
const inputPlace = document.querySelector(".popup__form-input_place");
const inputLink = document.querySelector(".popup__form-input_link");
const addCardButton = document.querySelector(".popup__form-button_add");
const popupCloseButtonAdd = document.querySelector(".popup__close-button_add");

const cardsContainer = document.querySelector('.elements');

function openPopup(popup){
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popup){
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupByEsc);
}

function closePopupByEsc(evt) {
  let openedPopup;
  popups.forEach((popup) => {
    if (popup.classList.contains('popup_opened'))
      openedPopup = popup;
  });

  if(evt.key === "Escape") {
    closePopup(openedPopup);
  }
}

function closePopupByClickOnOverLay(evt) {
  if(evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

function openEditForm(){
  openPopup(popupEditForm);
  formNameInput.value = profileName.textContent;
  formAboutInput.value = profileAbout.textContent;
}

function saveButtonHandler(e) {
  e.preventDefault();

  profileName.textContent = formNameInput.value;
  profileAbout.textContent = formAboutInput.value;

  closePopup(popupEditForm);
}

function addButtonHandler(e) {
  e.preventDefault();

  const place = inputPlace.value;
  const link = inputLink.value;

  const card = {
    name: place,
    link: link
  }

  const cardElement = new Card(card, cardConfig.cardTemplate);
  const newCard = cardElement.createCard();
  cardsContainer.prepend(newCard);

  closePopup(popupAddCardForm);
}

initialCards.forEach(card => {
  const cardElement = new Card(card, cardConfig.cardTemplate);
  const initCard = cardElement.createCard();
  cardsContainer.append(initCard);
});

profileEditButton.addEventListener("click", openEditForm);

addPhotoButton.addEventListener("click", () => {
  addForm.reset();
  addCardButton.classList.toggle("popup__form-button_disabled");
  openPopup(popupAddCardForm);
});

popupCloseButtonEdit.addEventListener("click", () => {
  closePopup(popupEditForm);
});

popupCloseButtonAdd.addEventListener("click", () => {
  closePopup(popupAddCardForm);
});

popupCloseButtonPreview.addEventListener("click", () => {
  closePopup(popupPreview);
});

popups.forEach((popup) => {
  popup.addEventListener("click", closePopupByClickOnOverLay);
});

editForm.addEventListener("submit", saveButtonHandler);

addForm.addEventListener("submit", addButtonHandler);

const formEditProfileValidator = new FormValidator(formConfig, editForm);
formEditProfileValidator.enableValidation();

const formAddCardValidator = new FormValidator(formConfig, addForm);
formAddCardValidator.enableValidation();

export {popupPreview, openPopup};


