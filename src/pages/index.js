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
import PopupWithConfirm from "../components/PopupWithConfirm.js";
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

//Подсказка, что данные загружаются на сервер
const renderLoading = (isLoading, button, initButtonText, loadingButtonText) => {
  if(isLoading){
    button.textContent = `${loadingButtonText}`;
  } else {
    button.textContent = `${initButtonText}`;
  }
}

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
const popupUserInfoForm = new PopupWithForm({
  popupSelector: popupSelectors.popupUserInfoFormSelector,
  handleFormSubmit: (formData) => {
    renderLoading(true, buttonSelectors.submitProfileButton, "Сохранить", "Загрузка...");
    api.updateUserInfo(formData).then(data => {
      document.querySelector(profileElementsSelectors.profileName).textContent = data.name;
      document.querySelector(profileElementsSelectors.profileAbout).textContent = data.about;
    })
    .then(() => {
      renderLoading(false, buttonSelectors.submitProfileButton, "Сохранить", "Загрузка...");
    })
    .finally(() => {
      popupUserInfoForm.close();
    });
  }
});
popupUserInfoForm.setEventListeners();

//Попап для загрузки аватара пользователя
const popupUserAvatarForm = new PopupWithForm({
  popupSelector: popupSelectors.popupUserAvatarFormSelector,
  handleFormSubmit: (formData) => {
    renderLoading(true, buttonSelectors.addAvatarButton, "Сохранить", "Загрузка...");
    api.updateUserAvatar(formData).then(data => {
      document.querySelector(profileElementsSelectors.profileAvatar).style.backgroundImage = `url("${data.avatar}")`;
    })
    .then(() => {
      renderLoading(false, buttonSelectors.addAvatarButton, "Сохранить", "Загрузка...");
    })
    .finally(() => {
      popupUserAvatarForm.close();
    });
  }
});
popupUserAvatarForm.setEventListeners();

//Попап для добавления карточки
const popupAddCardForm = new PopupWithForm({
  popupSelector: popupSelectors.popupAddCardFormSelector,
  handleFormSubmit: (formData) => {
    renderLoading(true, buttonSelectors.addCardButton, "Создать", "Сохранение...");
    api.uploadNewCard(formData)
    .then((card) => renderCard(card))
    .then(() => {
      renderLoading(false, buttonSelectors.addCardButton, "Создать", "Сохранение...");
    })
    .finally(() => {
      popupAddCardForm.close();
    });
  }
});
popupAddCardForm.setEventListeners();

//Попап для подтверждения удаления карточки
const popupConfirmDeletion = new PopupWithConfirm({
  popupSelector: popupSelectors.popupConfirmSelector,
  handleFormSubmit: ""
});
popupConfirmDeletion.setEventListeners();

//***Работа с карточками***//

//Создание карточки
const renderCard = (card) => {
  const cardElement = new Card({
    card: card,
    templateSelector: cardConfig.cardTemplate,
    handleCardClick: () => {
      previewPopup.open(card);
    },
    handleDeleteIconClick: (card) => {
      const newHandleFormSubmit = () => {
        renderLoading(true, buttonSelectors.confirmButton, "Да", "Удаление...");
        api.deleteCard(card)
        .then(() => renderLoading(false, buttonSelectors.confirmButton, "Да", "Удаление"))
        .then(() => cardElement.removeCard())
        .finally(() => {
          popupConfirmDeletion.close();
        });
      }
      popupConfirmDeletion.setHandleFormSubmit(newHandleFormSubmit);
      popupConfirmDeletion.open();
    },
    handleLikeClick: (e, card) => {
      if(card._likes.length === 0){
        api.likeCard(card)
          .then(data => {
            card._likes = data.likes;
            cardElement.increaseLikes(e, data.likes.length);
          });
        } else {
          api.loadUserInfo(). then(data => {
            card._likes.some(user => {
              if(user._id === data._id) {
                api.dislikeCard(card)
                .then(data => {
                  card._likes = data.likes;
                  cardElement.decreaseLikes(e, data.likes.length);
                }); //api.dislikeCard()
              } else {
                api.likeCard(card)
                .then(data => {
                  card._likes = data.likes;
                  cardElement.increaseLikes(e, data.likes.length);
                }); //api.likeCard()
              }
            }) //card._likes.forEach()
          }) //api.loadUserInfo()
        }
      },
  });

  const newCard = cardElement.createCard();

  api.loadUserInfo().then(data => {
    if(data._id !== card.owner._id) {
      newCard.querySelector(".element__delete-button").classList.add("element__delete-button_hidden");
    }
    card.likes.forEach(user => {
      if(user._id === data._id) {
        newCard.querySelector(".element__like-button").classList.add("element-like-button_active");
      }
    })
  });
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

//Кнопка редактирования аватара
buttonSelectors.editAvatarButton.addEventListener("click", () => {
  buttonSelectors.addAvatarButton.classList.add(formConfig.inactiveButtonClass);
  popupUserAvatarForm.open();
  }
);

//***Валидация форм***//

//Валидация формы редактирования профиля
const formEditProfileValidator = new FormValidator(formConfig, formSelectors.editForm);
formEditProfileValidator.enableValidation();

//Валидация формы замены аватара
const formEditAvatarValidator = new FormValidator(formConfig, formSelectors.avatarForm);
formEditAvatarValidator.enableValidation();

//Валидация формы добавления карточки
const formAddCardValidator = new FormValidator(formConfig, formSelectors.addForm);
formAddCardValidator.enableValidation();



