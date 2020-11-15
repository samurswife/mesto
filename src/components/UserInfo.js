export default class UserInfo {
  constructor(userNameSelector, userInfoSelector, userAvatarSelector){
    this._userNameSelector = userNameSelector;
    this._userInfoSelector = userInfoSelector;
    this._userAvatarSelector = userAvatarSelector;
    this._name = document.querySelector(this._userNameSelector);
    this._info = document.querySelector(this._userInfoSelector);
    this._avatar = document.querySelector(this._userAvatarSelector);
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

  setUserAvatar(avatar){
    this._avatar.style.backgroundImage = `url("${avatar}")`;
  }
}
