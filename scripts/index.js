import Card from './Card.js';
import FormValidator from './FormValidator.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';

const cardsContainerSelector = '.places';
const popupAddSelector = '.popup_add';
const popupEditSelector = '.popup_edit';
const popupPhotoSelector = '.popup_photo';

const popupEditElement = document.querySelector('.popup_edit');
const buttonEditElement = document.querySelector('.profile__edit-button');
const popupAddElelement = document.querySelector('.popup_add');
const buttonAddElement = document.querySelector('.profile__add-button');

const forms = Array.from(document.forms);
const formProfile = document.forms.formEditProfile;
const formAdd = document.forms.formAddPlace;

const inputUserName = formProfile.elements.userName;
const inputUserJob = formProfile.elements.aboutUser;
const inputPlace = formAdd.elements.name;

const data = {
  formSelector: '.popup__form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__input-error_active',
};

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

buttonEditElement.addEventListener('click', () => handleEditButtonClick(popupEditElement));
buttonAddElement.addEventListener('click', () => handleAddButtonClick(popupAddElelement));

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  aboutSelector: '.profile__subtitle'
});

userInfo.setUserInfo({
  userName: 'Haskell Brooks Curry',
  aboutUser: 'Eсть язык программирования на каждое из моих имён!'
})

const validationOfFormAdd = new FormValidator(data, formAdd);
validationOfFormAdd.enableValidation();

const validationOfFormProfile = new FormValidator(data, formProfile);
validationOfFormProfile.enableValidation();

const cardsList = new Section({
  items: initialCardsContent,
  renderer: (item) => {
    const card = new Card(
      item,
      '#place-template',
      (name, link) => {
        newPopupImage.open(name, link);
      });
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  }}, cardsContainerSelector)

cardsList.renderItems();

const popupAdd = new PopupWithForm({
  popupSelector: popupAddSelector,
  handleFormSubmit: (item) => {
    const card = new Card(
      item,
      '#place-template',
      (name, link) => {
        newPopupImage.open(name, link);
      });
    const cardElement = card.generateCard();
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