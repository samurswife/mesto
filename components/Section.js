export default class Section {
  constructor({items, rederer}, containerSelector) {
    this._items = items;
    this._renderer = rederer;
    this._container = containerSelector;
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element){
    this._container.append(element);
  }
}
