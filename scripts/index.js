const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');

const popupEdit = document.querySelector('.popup_edit');
const buttonEdit = document.querySelector('.profile__edit-button');
const formProfile = document.querySelector('.form_profile');
const inputUserName = document.querySelector('.form__input_type_name');
const inputUserJob = document.querySelector('.form__input_type_job');

const popupAdd = document.querySelector('.popup_add');
const buttonAdd = document.querySelector('.profile__add-button');
const formAdd = document.querySelector('.form_add');
const inputPlace = document.querySelector('.form__input_type_place-name');
const inputPlaceLink = document.querySelector('.form__input_type_place-link');

const popupPhoto = document.querySelector('.popup_photo');

const popupsAll = [...document.querySelectorAll('.popup')];
const buttonsCloseAll = [...document.querySelectorAll('.popup__close-button')];

const placesContainer = document.querySelector('.places');

const initialCards = [
  {
    name: 'Бали',
    link: './images/place-image-bali.jpg'
  },
  {
    name: 'Канада',
    link: './images/place-image-canada.jpg'
  },
  {
    name: 'Дубай, Эмираты',
    link: './images/place-image-dubai.jpg'
  },
  {
    name: 'Япония',
    link: './images/place-image-japan.jpg'
  },
  {
    name: 'Норвегия',
    link: './images/place-image-norway.jpg'
  },
  {
    name: 'США',
    link: './images/place-image-usa.jpg'
  },
];

fillCardsOnPageLoad();
enableFormValidation();

buttonEdit.addEventListener('click', () => handlEditButtonClick(popupEdit));
buttonAdd.addEventListener('click', () => handleAddButtonClick(popupAdd));

formProfile.addEventListener('submit', handleProfileFormSubmit);
formAdd.addEventListener('submit', handleAddFormSubmit);

buttonsCloseAll.map(button => button.addEventListener('click', () => closePopup(button.closest('.popup'))));

popupsAll.map(popup => popup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(popup);
  }
}));

function fillCardsOnPageLoad() {
  initialCards.map(card => addCard(placesContainer, createCard(card.name, card.link)));
}

function createCard(name, link) {
  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);

  placeElement.querySelector('.place__title').textContent = name;
  placeElement.querySelector('.place__cover').src = link;
  placeElement.querySelector('.place__cover').alt = name;
  placeElement.querySelector('.place__cover').addEventListener('click', handleCoverClick);
  placeElement.querySelector('.place__like-button').addEventListener('click', handleLikeClick);
  placeElement.querySelector('.place__delete-button').addEventListener('click', handleDeleteClick);

  return placeElement;
}

function addCard(container, placeElement) {
  container.prepend(placeElement);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  userName.textContent = inputUserName.value;
  userJob.textContent = inputUserJob.value;

  closePopup(popupEdit);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  
  addCard(placesContainer, createCard(inputPlace.value, inputPlaceLink.value));

  formAdd.reset();

  closePopup(popupAdd);
}

function handleLikeClick(evt) {
  evt.target.classList.toggle('place__like-button_active');
}

function handleDeleteClick(evt) {
  evt.target.closest('.place').remove();
}

function handleCoverClick(evt) {
  openPopup(popupPhoto);

  popupPhoto.querySelector('.popup__photo').src = evt.target.src;
  popupPhoto.querySelector('.popup__photo-caption').textContent = evt.target.alt;
}

function handlEditButtonClick(popup) {
  openPopup(popup);

  inputUserName.value = userName.textContent;
  inputUserJob.value = userJob.textContent;

  inputUserName.focus();
}

function handleAddButtonClick(popup) {
  openPopup(popup);
  
  inputPlace.focus();
}

function enableFormValidation() {
  const forms = Array.from(document.querySelectorAll('.form'));

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