const profileEditButton = document.querySelector(".profile__edit-button");
const addPhotoButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const popups = Array.from(document.querySelectorAll(".popup"));

const popupPreview = document.querySelector(".popup_preview");
const popupImage = document.querySelector(".popup__image");
const popupImageTitle = document.querySelector(".popup__image-title");
const popupCloseButtonPreview = document.querySelector(".popup__close-button_preview");

const popupEditForm = document.querySelector(".popup_edit-form");
const editForm = document.querySelector(".popup__form_edit");
const formNameInput = document.querySelector(".popup__form-input_name");
const formAboutInput = document.querySelector(".popup__form-input_about");
const formSaveButton = document.querySelector(".popup__form-button_save");
const popupCloseButtonEdit = document.querySelector(".popup__close-button_edit");

const popupAddPhotoForm = document.querySelector(".popup_add-form");
const addForm = document.querySelector(".popup__form_add");
const inputPlace = document.querySelector(".popup__form-input_place");
const inputLink = document.querySelector('.popup__form-input_link');
const formAddPhotoButton = document.querySelector(".popup__form-button_add");
const popupCloseButtonAdd = document.querySelector(".popup__close-button_add");

const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#cards').content;
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function createCard(item) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  const cardTitle = card.querySelector('.element__title');
  const likeButton = card.querySelector(".element__like-button");
  const deleteButton = card.querySelector(".element__delete-button");

  cardImage.style.backgroundImage = 'url(' + item.link + ')';
  cardImage.setAttribute("alt", item.name);
  cardTitle.textContent = item.name;

  cardImage.addEventListener('click', showPreview);
  likeButton.addEventListener('click', like);
  deleteButton.addEventListener('click', deleteCard);

  return card;
}

function like(e) {
  e.target.classList.toggle("element-like-button_active");
}

function deleteCard(e) {
  e.target.closest(".element").remove();
}

function openPopup(popup){
  popup.classList.add("popup_opened");
}

function closePopup(popup){
    popup.classList.remove("popup_opened");
}

function closePopupByClickOnOverLay (evt) {
  if(evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

function openEditForm(){
  openPopup(popupEditForm);
  formNameInput.value = profileName.textContent;
  formAboutInput.value = profileAbout.textContent;
}

function showPreview(e) {
  const element = e.target.closest(".element");
  const imageTitle = element.querySelector(".element__title").textContent;
  const bgImageUrl = e.target.style.backgroundImage;

  popupImageTitle.textContent = imageTitle;
  popupImage.setAttribute("src", bgImageUrl.slice((bgImageUrl.indexOf("\"") + 1), -2));
  popupImage.setAttribute("alt", imageTitle);

  openPopup(popupPreview);
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

  const newCard = createCard(card);

  cardsContainer.prepend(newCard);

  closePopup(popupAddPhotoForm);
}

initialCards.forEach(card => {
  const initCard = createCard(card);
  cardsContainer.append(initCard);
});

popups.forEach((popup) => {
  popup.addEventListener("click", closePopupByClickOnOverLay);
})

profileEditButton.addEventListener("click", openEditForm);
addPhotoButton.addEventListener("click", function() {
  inputPlace.value = "";
  inputLink.value = "";
  openPopup(popupAddPhotoForm);
}
);
popupCloseButtonEdit.addEventListener("click", function() {
  closePopup(popupEditForm);
});
popupCloseButtonAdd.addEventListener("click", function() {
  closePopup(popupAddPhotoForm);
});
popupCloseButtonPreview.addEventListener("click", function() {
  closePopup(popupPreview);
});
editForm.addEventListener("submit", saveButtonHandler);
addForm.addEventListener("submit", addButtonHandler);


