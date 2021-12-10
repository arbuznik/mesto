export default class Section {
  constructor({ renderer, containerSelector }) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderCards(cardsContent) {
    cardsContent.reverse().forEach(cardContent => this.renderCard(cardContent));
  }

  renderCard(cardContent) {
    const cardElement = this._renderer(cardContent);
    this._container.prepend(cardElement);
  }
}