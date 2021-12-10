import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

import { cardsContainerSelector, popupAddSelector, popupEditSelector, popupPhotoSelector, buttonEditElement, buttonAddElement, formProfile, formAdd, inputUserName, inputUserJob, inputPlace, data, popupConfirmationSelector, buttonEditAvatarElement, popupEditAvatarSelector, formEditAvatar, inputAvatarUrl } from '../utils/constants.js';

buttonEditElement.addEventListener('click', () => handleEditButtonClick());
buttonAddElement.addEventListener('click', () => handleAddButtonClick());
buttonEditAvatarElement.addEventListener('click', () => handleEditAvatarButtonClick())

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-31',
  headers: {
    authorization: '61bf9579-56f9-4dc5-93fe-675c5a604ab6',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  aboutSelector: '.profile__subtitle',
  avatarClass: 'profile__avatar',
  avatarContainerSelector: '.profile__avatar-overlay',
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
  .then(userData => {
    userInfo.setUserInfo(userData)
    userInfo.renderUserAvatar(userData)
  })
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

const validationOfFormAvatar = new FormValidator(data, formEditAvatar);
validationOfFormAvatar.enableValidation();

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
      .then(userInfoDetails => {
        userInfo.setUserInfo(userInfoDetails);
        popupEdit.close();
      })
      .catch(handleApiError);
  }});

popupEdit.setEventListeners();

const popupEditAvatar = new PopupWithForm({
  popupSelector: popupEditAvatarSelector,
  handleFormSubmit: (avatarLink) => {
    api.editUserAvatar(avatarLink)
      .then(handleApiResponse)
      .then(userData => {
        userInfo.removeAvatar();
        userInfo.renderUserAvatar(userData)
        popupEditAvatar.close();
      })
      .catch(handleApiError);
  }
})

popupEditAvatar.setEventListeners();

const popupImage = new PopupWithImage(popupPhotoSelector);
popupImage.setEventListeners();

const popupDeleteConfirmation = new PopupWithConfirmation({
  popupSelector: popupConfirmationSelector,
  handleConfirmation: (cardId) => {
    api.deleteCard(cardId)
      .then(handleApiResponse)
      .then(() => {
        document.getElementById(cardId).remove();
        popupDeleteConfirmation.close();
      })
      .catch(handleApiError);
  }});

popupDeleteConfirmation.setEventListeners();

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

function handleEditAvatarButtonClick() {
  validationOfFormAvatar.resetValidation();

  popupEditAvatar.open();
  window.setTimeout(() => inputAvatarUrl.focus(), 300);
}

function createCardElement(cardContent) {
  const card = new Card({
    cardContent: cardContent,
    templateSelector: '#place-template',
    userId: userInfo.getUserId(),
    handleCardClick: (name, link) => {
      popupImage.open(name, link);
    },
    handleDeleteClick: (cardId) => {
      popupDeleteConfirmation.open()
      popupDeleteConfirmation.setCardId(cardId);
    },
    handleLikeClick: (cardId, isLiked) => {
      if (isLiked) {
        api.removeCardLike(cardId)
          .then(handleApiResponse)
          .then(cardContent => {
            card.updateLikes(cardContent.likes)
          })
          .catch(handleApiError);
      } else {
        api.addCardLike(cardId)
          .then(handleApiResponse)
          .then(cardContent => {
            card.updateLikes(cardContent.likes)
      })
          .catch(handleApiError);
      }
    }});

  return card.generateCard();
}