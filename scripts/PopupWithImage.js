import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._cover = this._popup.querySelector('.popup__photo');
    this._caption = this._popup.querySelector('.popup__photo-caption');
  }

  open(name, link) {
    this._cover.src = link;
    this._cover.alt = name;
    this._caption.textContent = name;

    super.open();
  }
}