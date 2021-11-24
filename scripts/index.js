import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import Popup from './Popup.js';
import Section from './Section.js';

const cardsContainerSelector = '.places';
const popupAddSelector = '.popup_add';
const popupEditSelector = '.popup_edit';

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

const cardsList = new Section({
  items: initialCardsContent,
  renderer: (item) => {
    const card = new Card(item, '#place-template');
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  }}, cardsContainerSelector)

cardsList.renderItems();

const newPopupAdd = new Popup(popupAddSelector);
newPopupAdd.setEventListeners();

const newPopupEdit = new Popup(popupEditSelector);
newPopupEdit.setEventListeners();


buttonEdit.addEventListener('click', () => handlEditButtonClick(popupEdit));
buttonAdd.addEventListener('click', () => handleAddButtonClick(popupAdd));

formProfile.addEventListener('submit', handleProfileFormSubmit);
formAdd.addEventListener('submit', handleAddFormSubmit);

function renderCard(container, cardElement) {
  container.prepend(cardElement);
}

function fillEditProfilePopup() {
  inputUserName.value = userName.textContent;
  inputUserJob.value = userJob.textContent;
}

function handleProfileFormSubmit() {
  userName.textContent = inputUserName.value;
  userJob.textContent = inputUserJob.value;

  newPopupEdit.close();
}

function handleAddFormSubmit() {
  const cardContent = { name: inputPlace.value, link: inputPlaceLink.value };
  const cardElement = createCardElement(cardContent);
  renderCard(placesContainer, cardElement);

  formAdd.reset();

  newPopupAdd.close();
}

function handlEditButtonClick() {
  fillEditProfilePopup();
  validationOfFormProfile.resetValidation();  
  
  newPopupEdit.open();
  window.setTimeout(() => inputUserName.focus(), 200);
}

function handleAddButtonClick() {
  validationOfFormAdd.resetValidation();
  
  newPopupAdd.open();
  window.setTimeout(() => inputPlace.focus(), 200);
}