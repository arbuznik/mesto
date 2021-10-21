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

    setEventListeners(form);
  })  
}

enableFormValidation(pageConfig);

function setEventListeners(form) {
  const formInputs = Array.from(form.querySelectorAll(pageConfig.inputSelector));
  const submitButton = form.querySelector(pageConfig.submitButtonSelector);

  toggleSubmitButtonState(formInputs, submitButton);

  formInputs.forEach(formInput => {
    formInput.addEventListener('input', () => {
      isInputValid(form, formInput);
      toggleSubmitButtonState(formInputs, submitButton);
    });
  })
}

function isInputValid(form, input) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
}

function showInputError(form, input, errorMessage) {
  const inputError = form.querySelector(`.${input.id}-error`);
  input.classList.add(pageConfig.inputErrorClass);
  inputError.classList.add(pageConfig.errorClass);
  inputError.textContent = errorMessage;
}

function hideInputError(form, input) {
  const inputError = form.querySelector(`.${input.id}-error`);
  input.classList.remove(pageConfig.inputErrorClass);
  inputError.classList.remove(pageConfig.errorClass);
  inputError.textContent = '';
}

function toggleSubmitButtonState(inputs, submitButton) {
  if (areAllInputsValid(inputs)) {
    submitButton.classList.remove(pageConfig.inactiveButtonClass);
  } else {
    submitButton.classList.add(pageConfig.inactiveButtonClass);
  }
}

function areAllInputsValid(inputs) {
  return inputs.every(input => input.validity.valid);
}