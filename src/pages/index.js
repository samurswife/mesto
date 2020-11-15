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

//Обработка начального промиса
const handleOriginalResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

//Подсказка, что данные загружаются на сервер
const renderLoading = (isLoading, button, initButtonText, loadingButtonText) => {
  if(isLoading){
    button.textContent = `${loadingButtonText}`;
  } else {
    button.textContent = `${initButtonText}`;
  }
}

//***Создание профиля пользователя ***//

const userProfile = new UserInfo(profileElementsSelectors.profileName, profileElementsSelectors.profileAbout, profileElementsSelectors.profileAvatar);

//***Создание секции для карточек ***//

const cardsSection = new Section({
  renderer: renderCard
}, cardsContainer);

//***Создание попапов ***//

//Попап для просмотра картинки
const previewPopup = new PopupWithImage(popupSelectors.popupPreviewSelector);
previewPopup.setEventListeners();

//Попап для добавления информации о пользователе
const popupUserInfoForm = new PopupWithForm({
  popupSelector: popupSelectors.popupUserInfoFormSelector,
  handleFormSubmit: (formData) => {
    renderLoading(true, buttonSelectors.submitProfileButton, "Сохранить", "Загрузка...");
    api.updateUserInfo(formData, handleOriginalResponse).then(data => {
      userProfile.setUserInfo(data.name, data.about);
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
    api.updateUserAvatar(formData, handleOriginalResponse).then(data => {
      userProfile.setUserAvatar(data.avatar);
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
    Promise.all([
      api.uploadNewCard(formData, handleOriginalResponse),
      api.loadUserInfo(handleOriginalResponse)
    ])
    .then(([card, userData]) => renderCard(card, userData._id))
    .then(() => {
      renderLoading(false, buttonSelectors.addCardButton, "Создать", "Сохранение...");
    })
    .catch(err => {
      console.log(err);
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
function renderCard (card, userId) {
  const cardElement = new Card({
    card: card,
    templateSelector: cardConfig.cardTemplate,
    handleCardClick: () => {
      previewPopup.open(card);
    },
    handleDeleteIconClick: (card) => {
      const newHandleFormSubmit = () => {
        renderLoading(true, buttonSelectors.confirmButton, "Да", "Удаление...");
        api.deleteCard(card, handleOriginalResponse)
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
        api.likeCard(card, handleOriginalResponse)
          .then(data => {
            card._likes = data.likes;
            cardElement.increaseLikes(e, data.likes.length);
          });
      } else {
        card._likes.some(user => {
          if(user._id === userId) {
            api.dislikeCard(card, handleOriginalResponse)
            .then(data => {
              card._likes = data.likes;
              cardElement.decreaseLikes(e, data.likes.length);
            }); //api.dislikeCard()
          } else {
            api.likeCard(card, handleOriginalResponse)
            .then(data => {
              card._likes = data.likes;
              cardElement.increaseLikes(e, data.likes.length);
            }); //api.likeCard()
          }
        }) //card._likes.forEach()
      }
    },
    userId: userId
  });

  const newCard = cardElement.createCard();

  if(userId !== card.owner._id) {
    newCard.querySelector(".element__delete-button").classList.add("element__delete-button_hidden");
  }

  card.likes.forEach(user => {
    if(user._id === userId) {
      newCard.querySelector(".element__like-button").classList.add("element-like-button_active");
    }
  });

  cardsSection.addItem(newCard);
}

//***Загрузка начальных данных на страницу ***//
Promise.all([
  api.loadUserInfo(handleOriginalResponse),
  api.loadInitialCards(handleOriginalResponse)
])
.then(([userData, initialCards]) => {
  userProfile.setUserInfo(userData.name, userData.about);
  userProfile.setUserAvatar(userData.avatar);
  cardsSection.renderItems(initialCards, userData._id);
  setUserId(userData._id);
})
.catch(err => {
  console.log(err);
});

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



