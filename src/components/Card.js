export default class Card {
  constructor({ name, link, likes }, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;

    this._placeElement = this._getTemplate();

    this._buttonLike = this._placeElement.querySelector('.place__like-button');
    this._buttonDelete = this._placeElement.querySelector('.place__delete-button');
    this._placeCover = this._placeElement.querySelector('.place__cover');
    this._placeTitle = this._placeElement.querySelector('.place__title');
    this._placeLikeCounter = this._placeElement.querySelector('.place__like-counter');

    this._placeTitle.textContent = this._name;
    this._placeCover.src = this._link;
    this._placeCover.alt = this._name;
    this._placeLikeCounter.textContent = likes.length;

    this._setEventListeners();
  }

  _getTemplate() {
    this._cardTemplate = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.place')
      .cloneNode(true);

    return this._cardTemplate;
  }

  _handleLikeClick() {
    this._buttonLike.classList.toggle('place__like-button_active');
  }

  _handleDeleteClick() {
    this._placeElement.remove();
  }
  
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick();
    })

    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteClick();
    })

    this._placeCover.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
  }

  generateCard() {
    return this._placeElement;
  }
}