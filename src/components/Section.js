export default class Section {
  constructor({renderer}, containerSelector){
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems(cards, userId){
    cards.forEach((item) => {
      this._renderer(item, userId);
    })
  }

  addItem(element) {
    this._container.append(element);
  }
}
