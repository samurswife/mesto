export default class UserInfo {
  constructor(userNameSelector, userInfoSelector){
    this._userNameSelector = userNameSelector;
    this._userInfoSelector = userInfoSelector;
    this._name = document.querySelector(this._userNameSelector);
    this._info = document.querySelector(this._userInfoSelector);
  }

  getUserInfo() {
    const user = {};
    user.name = this._name.textContent;
    user.info = this._info.textContent;
    return user;
  }

  setUserInfo(name, info) {
    this._name.textContent = name;
    this._info.textContent = info;
  }
}
