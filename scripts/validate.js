enableFormValidation(forms);

function enableFormValidation(forms) {
  forms.forEach(form => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })

    setEventListeners(form);
  })
}

function setEventListeners(form) {
  const formInputs = Array.from(form.querySelectorAll('.form__input'));
  const submitButton = form.querySelector('.form__save-button');

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
  input.classList.add('form__input_error');
  inputError.classList.add('form__input-error_active');
  inputError.textContent = errorMessage;
}

function hideInputError(form, input) {
  const inputError = form.querySelector(`.${input.id}-error`);
  input.classList.remove('form__input_error');
  inputError.classList.remove('form__input-error_active');
  inputError.textContent = '';
}

function toggleSubmitButtonState(inputs, submitButton) {
  if (areAllInputsValid(inputs)) {
    submitButton.classList.remove('form__save-button_disabled');
  } else {
    submitButton.classList.add('form__save-button_disabled');
  }
}

function areAllInputsValid(inputs) {
  return inputs.every(input => input.validity.valid);
}