export class FormValidator {
  constructor(data, formElement) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    
    this._form = formElement;
  }

  _setEventListeners() {
    this._formInputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    this._formInputs.forEach(formInput => {
      formInput.addEventListener('input', () => {
        this._isInputValid(formInput);
        this._toggleSubmitButtonState(this._formInputs, this._submitButton);
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

  _showInputError(input) {
    input.classList.add(this._inputErrorClass);
    
    this._inputError = this._form.querySelector(`.${input.id}-error`);
    this._inputError.classList.add(this._errorClass);
    this._inputError.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    input.classList.remove(this._inputErrorClass);

    this._inputError = this._form.querySelector(`.${input.id}-error`);
    this._inputError.classList.remove(this._errorClass);
    this._inputError.textContent = '';
  }

  _toggleSubmitButtonState(formInputs, submitButton) {
    if (this._areAllInputsValid(formInputs)) {
      submitButton.classList.remove(this._inactiveButtonClass);
      submitButton.disabled = false;
    } else {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.disabled = true;
    }
  }

    _areAllInputsValid(formInputs) {
      return formInputs.every(input => input.validity.valid);
    }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })

    this._setEventListeners();
  }
}

