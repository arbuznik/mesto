// import { openPopup } from './index.js';

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;

    this._placeElement = this._getTemplate();

    this._buttonLike = this._placeElement.querySelector('.place__like-button');
    this._buttonDelete = this._placeElement.querySelector('.place__delete-button');
    this._placeCover = this._placeElement.querySelector('.place__cover');
    this._placeTitle = this._placeElement.querySelector('.place__title');

    this._placeTitle.textContent = this._name;
    this._placeCover.src = this._link;
    this._placeCover.alt = this._name;

    this.photoPopup = document.querySelector('.popup_photo');
    this.popupCover = document.querySelector('.popup__photo');
    this.popupCaption = document.querySelector('.popup__photo-caption');

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

  _handleCoverClick() {
    this.popupCover.src = this._link;
    this.popupCover.alt = this._name;
    this.popupCaption.textContent = this._name;

    openPopup(this.photoPopup);
  }
  
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick();
    })

    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteClick();
    })

    this._placeCover.addEventListener('click', () => {
      this._handleCoverClick();
    })
  }

  generateCard() {
    return this._placeElement;
  }
}