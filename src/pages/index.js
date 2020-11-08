import "./index.css";
import {
  popupSelectors,
  buttonSelectors,
  formSelectors,
  inputSelectors,
  profileElementsSelectors,
  cardsContainer,
  cardConfig,
  formConfig } from "../utils/constants.js";
import Api from "../components/Api.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js"
import FormValidator from "../components/FormValidator.js";

//***Создание класса Api***/

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
  headers: {
    authorization: '0a6bff0b-1736-41fa-9351-11fa93721afd',
    'Content-Type': 'application/json'
  }
});

//***Создание профиля пользователя ***//

const userProfile = new UserInfo(profileElementsSelectors.profileName, profileElementsSelectors.profileAbout);

//Загрузка данных пользователя на страницу с сервера
api.loadUserInfo().then(data => {
  document.querySelector(profileElementsSelectors.profileName).textContent = data.name;
  document.querySelector(profileElementsSelectors.profileAbout).textContent = data.about;
  document.querySelector(profileElementsSelectors.profileAvatar).style.backgroundImage = `url("${data.avatar}")`;
});

//***Создание попапов ***//

//Попап для просмотра картинки
const previewPopup = new PopupWithImage(popupSelectors.popupPreviewSelector);
previewPopup.setEventListeners();

//Попап для добавления информации о пользователе

// const popupUserInfoForm = new PopupWithForm({
//   popupSelector: popupSelectors.popupUserInfoFormSelector,
//   handleFormSubmit: () => {
//     const nameValue = inputSelectors.formNameInput.value;
//     const infoValue = inputSelectors.formAboutInput.value;
//     userProfile.setUserInfo(nameValue, infoValue);
//     popupUserInfoForm.close();
//   }
// });
const popupUserInfoForm = new PopupWithForm({
  popupSelector: popupSelectors.popupUserInfoFormSelector,
  handleFormSubmit: () => {
    const userInfo = {
      name: inputSelectors.formNameInput.value,
      about: inputSelectors.formAboutInput.value
    }
    api.updateUserInfo(userInfo).then(data => {
      document.querySelector(profileElementsSelectors.profileName).textContent = data.name;
      document.querySelector(profileElementsSelectors.profileAbout).textContent = data.about;
    }
    );
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
  renderer: renderCard
}, cardsContainer);

api.loadInitialCards().then(res => cardsSection.renderItems(res));

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



