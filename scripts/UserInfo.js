export default class UserInfo {
  constructor(userNameSelector, userInfoSelector){
    this._userNameSelector = userNameSelector;
    this._userInfoSelector = userInfoSelector;
  }

  getUserInfo() {
    const user = {};
    user.name = document.querySelector(this._userNameSelector).textContent;
    user.about = document.querySelector(this._userInfoSelector).textContent
    return user;
  }

  setUserInfo() {
    document.querySelector(this._userNameSelector).textContent = document.querySelector(".popup__form-input_name").value;
    document.querySelector(this._userInfoSelector).textContent = document.querySelector(".popup__form-input_about").value;
  }
}
