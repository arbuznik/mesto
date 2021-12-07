import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

import { cardsContainerSelector, popupAddSelector, popupEditSelector, popupPhotoSelector, popupEditElement, buttonEditElement, popupAddElelement, buttonAddElement, formProfile, formAdd, inputUserName, inputUserJob, inputPlace, data, popupConfirmationSelector } from '../utils/constants.js';

buttonEditElement.addEventListener('click', () => handleEditButtonClick(popupEditElement));
buttonAddElement.addEventListener('click', () => handleAddButtonClick(popupAddElelement));

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-31',
  headers: {
    authorization: '61bf9579-56f9-4dc5-93fe-675c5a604ab6',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  aboutSelector: '.profile__subtitle'
});

function handleApiResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function handleApiError(err) {
  console.log(err);
}

api.getUserInfo()
  .then(handleApiResponse)
  .then(result => userInfo.setUserInfo(result))
  .catch(handleApiError);

const cardsList = new Section({
  renderer: (cardContent) => {
    const cardElement = createCardElement(cardContent);
    cardsList.addItem(cardElement);
  },
  containerSelector: cardsContainerSelector
});

api.getInitialCards()
  .then(handleApiResponse)
  .then(result => renderInitialCards(result))
  .catch(handleApiError);

function renderInitialCards(cardsContent) {
  cardsList.renderItems(cardsContent);
}

const validationOfFormAdd = new FormValidator(data, formAdd);
validationOfFormAdd.enableValidation();

const validationOfFormProfile = new FormValidator(data, formProfile);
validationOfFormProfile.enableValidation();

const popupAdd = new PopupWithForm({
  popupSelector: popupAddSelector,
  handleFormSubmit: (cardContent) => {
    api.addNewCard(cardContent)
      .then(handleApiResponse)
      .then(result => {
        const cardElement = createCardElement(result);
        cardsList.addItem(cardElement);
        popupAdd.close();
      })
      .catch(handleApiError);
  }});

popupAdd.setEventListeners();

const popupEdit = new PopupWithForm({
  popupSelector: popupEditSelector,
  handleFormSubmit: (userData) => {
    api.editUserInfo(userData)
      .then(handleApiResponse)
      .then(result => {
        userInfo.setUserInfo(result);
        popupEdit.close();
      })
      .catch(handleApiError);
  }});

popupEdit.setEventListeners();

const popupImage = new PopupWithImage(popupPhotoSelector);
popupImage.setEventListeners();

const popupConfirmation = new PopupWithConfirmation(popupConfirmationSelector);
popupConfirmation.setEventListeners();

function fillEditProfilePopup() {
  const { name, about } = userInfo.getUserInfo();
  inputUserName.value = name;
  inputUserJob.value = about;
}

function handleEditButtonClick() {
  fillEditProfilePopup();
  validationOfFormProfile.resetValidation();  
  
  popupEdit.open();
  window.setTimeout(() => inputUserName.focus(), 300);
}

function handleAddButtonClick() {
  validationOfFormAdd.resetValidation();
  
  popupAdd.open();
  window.setTimeout(() => inputPlace.focus(), 300);
}

function createCardElement(cardContent) {
  const card = new Card(
    cardContent,
    '#place-template',
    (name, link) => {
      popupImage.open(name, link);
    });

  return card.generateCard();
}