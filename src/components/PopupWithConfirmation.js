import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({popupSelector, handleConfirmation}) {
    super(popupSelector);

    this._confirmationButton = this._popup.querySelector('.popup__save-button');
    this._handleConfirmation = handleConfirmation;
  }

  setEventListeners() {
    super.setEventListeners();

    this._confirmationButton.addEventListener('click', () => {
      this._setConfirmationButtonLoadingState();
      this._handleConfirmation(this._cardId)
    });
  }
  
  setCardId(cardId) {
    this._cardId = cardId;
  }

  _setConfirmationButtonLoadingState() {
    this._confirmationButton.textContent = 'Удаление...';
  }

  setConfirmationButtonNormalState() {
    this._confirmationButton.textContent = 'Да';
  }
}
