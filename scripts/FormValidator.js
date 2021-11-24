export class FormValidator {
  constructor(data, formElement) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    
    this._form = formElement;

    this._formInputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  _setEventListeners() {
    this._formInputs.forEach(formInput => {
      formInput.addEventListener('input', () => {
        this._isInputValid(formInput);
        this._toggleSubmitButtonState();
      });
    })
  }

  _isInputValid(formInput) {
    if (!formInput.validity.valid) {
      this._showInputError(formInput);
    } else {
      this._hideInputError(formInput);
    }
  }

  _showInputError(formInput) {
    formInput.classList.add(this._inputErrorClass);
    
    this._inputError = this._form.querySelector(`.${formInput.id}-error`);
    this._inputError.classList.add(this._errorClass);
    this._inputError.textContent = formInput.validationMessage;
  }

  _hideInputError(formInput) {
    formInput.classList.remove(this._inputErrorClass);

    this._inputError = this._form.querySelector(`.${formInput.id}-error`);
    this._inputError.classList.remove(this._errorClass);
    this._inputError.textContent = '';
  }

  _toggleSubmitButtonState() {  
    if (this._areAllInputsValid()) {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    } else {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    }
  }

  _areAllInputsValid() {
      return this._formInputs.every(input => input.validity.valid);
  }

  resetValidation() {
    this._toggleSubmitButtonState();

    this._formInputs.forEach(formInput => {
      this._hideInputError(formInput);
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })

    this._setEventListeners();
  }
}

