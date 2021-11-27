import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

import { cardsContainerSelector, popupAddSelector, popupEditSelector, popupPhotoSelector, popupEditElement, buttonEditElement, popupAddElelement, buttonAddElement, formProfile, formAdd, inputUserName, inputUserJob, inputPlace, data, initialCardsContent } from '../utils/constants.js';

buttonEditElement.addEventListener('click', () => handleEditButtonClick(popupEditElement));
buttonAddElement.addEventListener('click', () => handleAddButtonClick(popupAddElelement));

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  aboutSelector: '.profile__subtitle'
});

const validationOfFormAdd = new FormValidator(data, formAdd);
validationOfFormAdd.enableValidation();

const validationOfFormProfile = new FormValidator(data, formProfile);
validationOfFormProfile.enableValidation();

const cardsList = new Section({
  items: initialCardsContent,
  renderer: (cardContent) => {
    const cardElement = createCardElement(cardContent);
    cardsList.addItem(cardElement);
  }}, cardsContainerSelector)

cardsList.renderItems();

const popupAdd = new PopupWithForm({
  popupSelector: popupAddSelector,
  handleFormSubmit: (cardContent) => {
    const cardElement = createCardElement(cardContent);
    cardsList.addItem(cardElement);

    popupAdd.close();
  }});

popupAdd.setEventListeners();

const popupEdit = new PopupWithForm({
  popupSelector: popupEditSelector,
  handleFormSubmit: (userData) => {
    userInfo.setUserInfo(userData);
    popupEdit.close();
  }});

popupEdit.setEventListeners();

const newPopupImage = new PopupWithImage(popupPhotoSelector);
newPopupImage.setEventListeners();

function fillEditProfilePopup() {
  const { userName, aboutUser } = userInfo.getUserInfo();
  inputUserName.value = userName;
  inputUserJob.value = aboutUser;
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
      newPopupImage.open(name, link);
    });

  return card.generateCard();
}