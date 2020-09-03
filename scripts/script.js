let profile = document.querySelector(".profile");
let profileEditButton = profile.querySelector(".profile__edit-button");
let profileName = profile.querySelector(".profile__name");
let profileAbout = profile.querySelector(".profile__about");
let popup = document.querySelector(".popup");
let popupCloseButton = popup.querySelector(".popup__close-button");
let form = popup.querySelector(".popup__form");
let formNameInput = form.querySelector(".popup__form-input_name");
let formAboutInput = form.querySelector(".popup__form-input_about");
let formSaveButton = form.querySelector(".popup__form-button");

function showPopup(){
  popup.classList.add("popup_opened");
  formNameInput.value = profileName.textContent;
  formAboutInput.value = profileAbout.textContent;
}

function closePopup(){
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = formNameInput.value;
  profileAbout.textContent = formAboutInput.value;

  closePopup();
}

profileEditButton.addEventListener('click', showPopup);
popupCloseButton.addEventListener('click', closePopup);
form.addEventListener('submit', formSubmitHandler);
