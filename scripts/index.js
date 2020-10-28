import {
  initialCards,
  popupSelectors,
  buttonSelectors,
  formSelectors,
  inputSelectors,
  profileElementsSelectors,
  cardsContainer,
  cardConfig,
  formConfig } from "./constants.js";
import Section from "./Section.js";
import Card from "./Card.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js"
import FormValidator from "./FormValidator.js";

//***Создание профиля пользователя ***//

const userProfile = new UserInfo(profileElementsSelectors.profileName, profileElementsSelectors.profileAbout);

//***Создание попапов ***//

//Попап для просмотра картинки
const previewPopup = new PopupWithImage(popupSelectors.popupPreviewSelector);
previewPopup.setEventListeners();

//Попап для добавления информации о пользователе

const popupUserInfoForm = new PopupWithForm({
  popupSelector: popupSelectors.popupUserInfoFormSelector,
  handleFormSubmit: () => {
    userProfile.setUserInfo();
    popupUserInfoForm.close();
  }
});
popupUserInfoForm.setEventListeners();

//Попап для добавления карточки
const popupAddCardForm = new PopupWithForm({
  popupSelector: popupSelectors.popupAddCardFormSelector,
  handleFormSubmit: (formData) => {
    renderCard(formData);
    popupAddCardForm.close();
  }
});
popupAddCardForm.setEventListeners();

//***Работа с карточками***//

//Создание карточки
const renderCard = (card) => {
  const cardElement = new Card(card, cardConfig.cardTemplate, () => {
    previewPopup.open(card);
  });
  const newCard = cardElement.createCard();
  cardsSection.addItem(newCard);
}

//Отрисовка начальных карточек
const cardsSection = new Section({
  data: initialCards,
  renderer: renderCard
}, cardsContainer);

cardsSection.renderItems();

//***Слушатели событий ***//

//Кнопка добавления карточки
buttonSelectors.addPhotoButton.addEventListener("click", () => {
  buttonSelectors.addCardButton.classList.add(formConfig.inactiveButtonClass);
  popupAddCardForm.open();
  }
);

//Кнопка редактирования профиля
buttonSelectors.profileEditButton.addEventListener("click", () => {
  inputSelectors.formNameInput.value = userProfile.getUserInfo().name;
  inputSelectors.formAboutInput.value = userProfile.getUserInfo().about;
  popupUserInfoForm.open();
});

//***Валидация форм***//

//Валидация формы редактирования профиля
const formEditProfileValidator = new FormValidator(formConfig, formSelectors.editForm);
formEditProfileValidator.enableValidation();

//Валидация формы добавления карточки
const formAddCardValidator = new FormValidator(formConfig, formSelectors.addForm);
formAddCardValidator.enableValidation();



