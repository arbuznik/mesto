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
      this.toggleRenderLoading('Удаление...');
      this._handleConfirmation(this._cardId)
    });
  }
  
  setCardId(cardId) {
    this._cardId = cardId;
  }

  toggleRenderLoading(buttonText = 'Да') {
    this._confirmationButton.textContent = buttonText;
  }
}
