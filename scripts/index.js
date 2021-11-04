import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');

const popupEdit = document.querySelector('.popup_edit');
const buttonEdit = document.querySelector('.profile__edit-button');
const popupAdd = document.querySelector('.popup_add');
const buttonAdd = document.querySelector('.profile__add-button');

const forms = Array.from(document.forms);
const formProfile = document.forms.formEditProfile;
const formAdd = document.forms.formAddPlace;

const data = {
  formSelector: '.popup__form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__input-error_active',
};

const validationOfFormAdd = new FormValidator(data, formAdd);
const validationOfFormProfile = new FormValidator(data, formProfile);

validationOfFormAdd.enableValidation();
validationOfFormProfile.enableValidation();

const inputUserName = formProfile.elements.userName;
const inputUserJob = formProfile.elements.userJob;
const inputPlace = formAdd.elements.placeName;
const inputPlaceLink = formAdd.elements.placeLink;

const allPopups = Array.from(document.querySelectorAll('.popup'));
const allCloseButtons = Array.from(document.querySelectorAll('.popup__close-button'));

const placesContainer = document.querySelector('.places');

const initialCardsContent = [
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

buttonEdit.addEventListener('click', () => handlEditButtonClick(popupEdit));
buttonAdd.addEventListener('click', () => handleAddButtonClick(popupAdd));

formProfile.addEventListener('submit', handleProfileFormSubmit);
formAdd.addEventListener('submit', handleAddFormSubmit);

allCloseButtons.forEach(button => button.addEventListener('click', () => closePopup(button.closest('.popup'))));

// overlay click listener
allPopups.forEach(popup => popup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(popup);
  }
}));

function createCardElement(cardContent) {
  const card = new Card(cardContent, '#place-template');
  return card.generateCard();
}

function renderCard(container, cardElement) {
  container.prepend(cardElement);
}

function fillCardsOnPageLoad() {
  initialCardsContent.forEach(cardContent => {
    const cardElement = createCardElement(cardContent);
    renderCard(placesContainer, cardElement);
  });
}

function fillEditProfilePopup() {
  inputUserName.value = userName.textContent;
  inputUserJob.value = userJob.textContent;
}

export function openPopup(popup) {
  document.addEventListener('keydown', handleDocumentKeyboardEvents);

  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', handleDocumentKeyboardEvents);
}

function handleProfileFormSubmit() {
  userName.textContent = inputUserName.value;
  userJob.textContent = inputUserJob.value;

  closePopup(popupEdit);
}

function handleAddFormSubmit() {
  const cardContent = { name: inputPlace.value, link: inputPlaceLink.value };
  const cardElement = createCardElement(cardContent);
  renderCard(placesContainer, cardElement);

  formAdd.reset();

  closePopup(popupAdd);
}

function handlEditButtonClick(popup) {
  fillEditProfilePopup();
  validationOfFormProfile.resetValidation();  
  
  openPopup(popup);
  window.setTimeout(() => inputUserName.focus(), 200);
}

function handleAddButtonClick(popup) {
  validationOfFormAdd.resetValidation();
  
  openPopup(popup);
  window.setTimeout(() => inputPlace.focus(), 200);
}

function handleDocumentKeyboardEvents(evt) {
  if (evt.key === 'Escape') { 
    const openedPopup = document.querySelector('.popup_opened');
     if (openedPopup) {
       closePopup(openedPopup);
     }
  }
}

fillCardsOnPageLoad();