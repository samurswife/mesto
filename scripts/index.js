import {initialCards, config} from './config.js';
import Card from './Card.js';

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

const popupAddPhotoForm = document.querySelector(".popup_add-form");
const addForm = document.querySelector(".popup__form_add");
const inputPlace = document.querySelector(".popup__form-input_place");
const inputLink = document.querySelector('.popup__form-input_link');
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

  const cardElement = new Card(card.name, card.link, config.cardTemplate);
  const newCard = cardElement.createCard();
  cardsContainer.prepend(newCard);

  closePopup(popupAddPhotoForm);
}

//отрисовка начальных карточек
initialCards.forEach(card => {
  const cardElement = new Card(card.name, card.link, config.cardTemplate);
  const initCard = cardElement.createCard();
  cardsContainer.append(initCard);
});

profileEditButton.addEventListener("click", openEditForm);

addPhotoButton.addEventListener("click", function() {
  inputPlace.value = "";
  inputLink.value = "";
  openPopup(popupAddPhotoForm);
});

popupCloseButtonEdit.addEventListener("click", function() {
  closePopup(popupEditForm);
});

popupCloseButtonAdd.addEventListener("click", function() {
  closePopup(popupAddPhotoForm);
});

popupCloseButtonPreview.addEventListener("click", function() {
  closePopup(popupPreview);
});

popups.forEach((popup) => {
  popup.addEventListener("click", closePopupByClickOnOverLay);
});

editForm.addEventListener("submit", saveButtonHandler);

addForm.addEventListener("submit", addButtonHandler);

export {popupPreview, openPopup};

