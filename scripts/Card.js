import { openPopup } from './index.js';

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
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
    this._placeElement.querySelector('.place__like-button').classList.toggle('place__like-button_active');
  }

  _handleDeleteClick() {
    this._placeElement.remove();
  }

  _handleCoverClick() {
    this.popupPhoto = document.querySelector('.popup_photo');
    this.popupPhoto.querySelector('.popup__photo').src = this._placeElement.querySelector('.place__cover').src;
    this.popupPhoto.querySelector('.popup__photo-caption').textContent = this._placeElement.querySelector('.place__cover').alt;

    openPopup(this.popupPhoto);
  }
  
  _setEventListeners() {
    this._placeElement.querySelector('.place__like-button').addEventListener('click', () => {
      this._handleLikeClick();
    })

    this._placeElement.querySelector('.place__delete-button').addEventListener('click', () => {
      this._handleDeleteClick();
    })

    this._placeElement.querySelector('.place__cover').addEventListener('click', () => {
      this._handleCoverClick();
    })
  }

  generateCard() {
    this._placeElement = this._getTemplate();
    this._setEventListeners();

    this._placeElement.querySelector('.place__title').textContent = this._name;
    this._placeElement.querySelector('.place__cover').src = this._link;
    this._placeElement.querySelector('.place__cover').alt = this._name;

    return this._placeElement;
  }
}