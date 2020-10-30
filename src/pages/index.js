import "./index.css";
import {
  initialCards,
  popupSelectors,
  buttonSelectors,
  formSelectors,
  inputSelectors,
  profileElementsSelectors,
  cardsContainer,
  cardConfig,
  formConfig } from "../utils/constants.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js"
import FormValidator from "../components/FormValidator.js";

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
    const nameValue = inputSelectors.formNameInput.value;
    const infoValue = inputSelectors.formAboutInput.value;
    userProfile.setUserInfo(nameValue, infoValue);
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
  const userObj = userProfile.getUserInfo();
  inputSelectors.formNameInput.value = userObj.name;
  inputSelectors.formAboutInput.value = userObj.info;
  popupUserInfoForm.open();
});

//***Валидация форм***//

//Валидация формы редактирования профиля
const formEditProfileValidator = new FormValidator(formConfig, formSelectors.editForm);
formEditProfileValidator.enableValidation();

//Валидация формы добавления карточки
const formAddCardValidator = new FormValidator(formConfig, formSelectors.addForm);
formAddCardValidator.enableValidation();



