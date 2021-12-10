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
buttonEditAvatarElement.addEventListener('click', () => handleEditAvatarButtonClick());

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
  avatarSelector: '.profile__avatar',
  avatarContainerSelector: '.profile__avatar-overlay',
});

const cardsList = new Section({
  renderer: (cardContent) => {
    return createCardElement(cardContent);
  },
  containerSelector: cardsContainerSelector
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData);
    cardsList.renderCards(cardsData);
  })
  .catch(api.handleApiError);

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
      .then(cardContent => {
        cardsList.renderCard(cardContent);
        popupAdd.close();
      })
      .finally(() => {
        popupAdd.toggleRenderLoading('Создать');
      })
      .catch(api.handleApiError)
  }});

popupAdd.setEventListeners();

const popupEdit = new PopupWithForm({
  popupSelector: popupEditSelector,
  handleFormSubmit: (userData) => {
    api.editUserInfo(userData)
      .then(userInfoDetails => {
        userInfo.setUserInfo(userInfoDetails);
        popupEdit.close();
      })
      .finally(() => {
        popupEdit.toggleRenderLoading();
      })
      .catch(api.handleApiError)
  }});

popupEdit.setEventListeners();

const popupEditAvatar = new PopupWithForm({
  popupSelector: popupEditAvatarSelector,
  handleFormSubmit: (avatarLink) => {
    api.editUserAvatar(avatarLink)
      .then(userData => {
        userInfo.setUserInfo(userData)
        popupEditAvatar.close();
      })
      .finally(() => {
        popupEditAvatar.toggleRenderLoading();
      })
      .catch(api.handleApiError)
  }
})

popupEditAvatar.setEventListeners();

const popupImage = new PopupWithImage(popupPhotoSelector);
popupImage.setEventListeners();

const popupDeleteConfirmation = new PopupWithConfirmation({
  popupSelector: popupConfirmationSelector,
  handleConfirmation: (cardId) => {
    api.deleteCard(cardId)
      .then(() => {
        document.getElementById(cardId).remove();
        popupDeleteConfirmation.close();
      })
      .finally(() => {
        popupDeleteConfirmation.toggleRenderLoading();
      })
      .catch(api.handleApiError)
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
      popupDeleteConfirmation.open();
      popupDeleteConfirmation.setCardId(cardId);
    },
    handleLikeClick: (cardId, isLiked) => {
      if (isLiked) {
        api.removeCardLike(cardId)
          .then(cardContent => {
            card.updateLikes(cardContent.likes)
          })
          .catch(api.handleApiError);
      } else {
        api.addCardLike(cardId)
          .then(cardContent => {
            card.updateLikes(cardContent.likes)
      })
          .catch(api.handleApiError);
      }
    }});

  return card.generateCard();
}