import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;

    this._form = this._popup.querySelector('.form');
    this._formInputs = Array.from(this._popup.querySelectorAll('.form__input'));
    this._submitButton = this._popup.querySelector('.popup__save-button');
  }

  _getInputValues() {
    this._inputValues = {};

    this._formInputs.forEach(input => {
      this._inputValues[input.name] = input.value;
    })
    
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', () => {
      this.toggleRenderLoading('Сохранение...');
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
  }

  close() {
    this._form.reset();
    super.close();
  }

  toggleRenderLoading(buttonText = 'Сохранить') {
    this._submitButton.textContent = buttonText;
  }
}