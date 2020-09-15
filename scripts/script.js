const profileEditButton = document.querySelector(".profile__edit-button");
const addPhotoButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const popup = document.querySelectorAll(".popup");
const popupEditForm = document.querySelector(".popup_edit-form");
const popupAddPhotoForm = document.querySelector(".popup_add-form");
const popupCloseButton = document.querySelectorAll(".popup__close-button");

const editForm = document.querySelector(".popup__form_edit");
let formNameInput = document.querySelector(".popup__form-input_name");
let formAboutInput = document.querySelector(".popup__form-input_about");
const formSaveButton = document.querySelector(".popup__form-button_save");

const addForm = document.querySelector(".popup__form_add");
const inputPlace = document.querySelector(".popup__form-input_place");
const inputLink = document.querySelector('.popup__form-input_link');
const formAddPhotoButton = document.querySelector(".popup__form-button_add");

const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#cards').content;
const initialCards = [
  {
      name: 'алтай',
      link: '../images/altai.jpg'
  },
  {
      name: 'домбай',
      link: '../images/dombai.png'
  },
  {
      name: 'эльбрус',
      link: '../images/elbrus.png'
  },
  {
      name: 'ергаки',
      link: '../images/ergaki.jpg'
  },
  {
      name: 'Карачаево-Черкессия',
      link: '../images/karachaevo-cherkessiya.jpg'
  },
  {
      name: 'карачаевск',
      link: '../images/karachaevsk.jpg'
  }
];

function renderCards() {
  for (let i = 0; i < initialCards.length; i++) {
    let card = cardTemplate.cloneNode(true);
    card.querySelector('.element__image').style.backgroundImage = 'url(' + initialCards[i].link + ')';
    card.querySelector('.element__title').textContent = initialCards[i].name;

    card.querySelectorAll(".element__like-button").forEach(btn =>{
      btn.addEventListener('click', like);
    });

    card.querySelectorAll(".element__delete-button").forEach(btn =>{
      btn.addEventListener('click', deleteCard);

    cardsContainer.append(card);
    });
  }
};

function clearCards() {
  for (let i = 0; i < initialCards.length; i++) {
    const cards = document.querySelectorAll(".element");
    cards.forEach(card => {
      card.remove();
    });
  }
};

function showPopupEditForm(){
  popupEditForm.classList.add("popup_opened");
  formNameInput.value = profileName.textContent;
  formAboutInput.value = profileAbout.textContent;
}

function showPopupAddPhotoForm(){
  popupAddPhotoForm.classList.add("popup_opened");
}

function closePopup(){
  popup.forEach(popup => {
    popup.classList.remove("popup_opened");
  });
}

function saveButtonHandler(e) {
  e.preventDefault();

  profileName.textContent = formNameInput.value;
  profileAbout.textContent = formAboutInput.value;

  closePopup();
}

function addButtonHandler(e) {
  e.preventDefault();

  let place = inputPlace.value;
  let link = inputLink.value;

  let card = {
    name: place,
    link: link
  }

  initialCards.unshift(card);
  inputPlace.value = "";
  inputLink.value = "";
  clearCards()
  renderCards();
  closePopup();
}

function like(e) {
  e.target.classList.toggle("element-like-button_active");
}

function deleteCard(e) {
  e.target.parentNode.remove();
}

renderCards();

profileEditButton.addEventListener('click', showPopupEditForm);
addPhotoButton.addEventListener('click', showPopupAddPhotoForm);
popupCloseButton.forEach(btn => {
  btn.addEventListener('click', closePopup);
});
editForm.addEventListener('submit', saveButtonHandler);
addForm.addEventListener('submit', addButtonHandler);
