const pageConfig = {
  formSelector: '.popup__form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__input-error_active'
};

function enableFormValidation(pageConfig) {
  const forms = Array.from(document.querySelectorAll(pageConfig.formSelector));

  forms.forEach(form => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })

    setEventListeners(form, pageConfig);
  })  
}

enableFormValidation(pageConfig);

function setEventListeners(form, pageConfig) {
  const formInputs = Array.from(form.querySelectorAll(pageConfig.inputSelector));
  const submitButton = form.querySelector(pageConfig.submitButtonSelector);

  formInputs.forEach(formInput => {
    formInput.addEventListener('input', () => {
      isInputValid(form, formInput, pageConfig);
      toggleSubmitButtonState(formInputs, submitButton, pageConfig);
    });
  })
}

function isInputValid(form, input, pageConfig) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, pageConfig);
  } else {
    hideInputError(form, input, pageConfig);
  }
}

function showInputError(form, input, errorMessage, pageConfig) {
  const inputError = form.querySelector(`.${input.id}-error`);
  input.classList.add(pageConfig.inputErrorClass);
  inputError.classList.add(pageConfig.errorClass);
  inputError.textContent = errorMessage;
}

function hideInputError(form, input, pageConfig) {
  const inputError = form.querySelector(`.${input.id}-error`);
  input.classList.remove(pageConfig.inputErrorClass);
  inputError.classList.remove(pageConfig.errorClass);
  inputError.textContent = '';
}

function toggleSubmitButtonState(inputs, submitButton, pageConfig) {
  if (areAllInputsValid(inputs)) {
    submitButton.classList.remove(pageConfig.inactiveButtonClass);
  } else {
    submitButton.classList.add(pageConfig.inactiveButtonClass);
  }
}

function areAllInputsValid(inputs) {
  return inputs.every(input => input.validity.valid);
}