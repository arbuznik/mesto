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

  handleLikeClick(evt) {
    evt.target.classList.toggle('place__like-button_active');
  }

  handleDeleteClick(evt) {
    evt.target.closest('.place').remove();
  }

  handleCoverClick(evt) {
    this.popupPhoto = document.querySelector('.popup_photo');
    this.popupPhoto.querySelector('.popup__photo').src = evt.target.src;
    this.popupPhoto.querySelector('.popup__photo-caption').textContent = evt.target.alt;

    openPopup(this.popupPhoto);
  }
  
  _setEventListeners() {
    this.placeElement.querySelector('.place__like-button').addEventListener('click', (evt) => {
      this.handleLikeClick(evt);
    })

    this.placeElement.querySelector('.place__delete-button').addEventListener('click', (evt) => {
      this.handleDeleteClick(evt);
    })

    this.placeElement.querySelector('.place__cover').addEventListener('click', (evt) => {
      this.handleCoverClick(evt);
    })
  }

  generateCard() {
    this.placeElement = this._getTemplate();
    this._setEventListeners();

    this.placeElement.querySelector('.place__title').textContent = this._name;
    this.placeElement.querySelector('.place__cover').src = this._link;
    this.placeElement.querySelector('.place__cover').alt = this._name;

    return this.placeElement;
  }
}