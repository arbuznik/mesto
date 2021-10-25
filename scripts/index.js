const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');

const popupEdit = document.querySelector('.popup_edit');
const buttonEdit = document.querySelector('.profile__edit-button');
const popupAdd = document.querySelector('.popup_add');
const buttonAdd = document.querySelector('.profile__add-button');

const forms = Array.from(document.forms);
const formProfile = document.forms.formEditProfile;
const formAdd = document.forms.formAddPlace;

const inputUserName = formProfile.elements.userName;
const inputUserJob = formProfile.elements.userJob;
const inputPlace = formAdd.elements.placeName;
const inputPlaceLink = formAdd.elements.placeLink;

const popupPhoto = document.querySelector('.popup_photo');

const popupsAll = Array.from(document.querySelectorAll('.popup'));
const buttonsCloseAll = Array.from(document.querySelectorAll('.popup__close-button'));

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

fillCardsOnPageLoad();

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

function fillEditProfilePopup() {
  inputUserName.value = userName.textContent;
  inputUserJob.value = userJob.textContent;
}

function addCard(container, placeElement) {
  container.prepend(placeElement);
}

function openPopup(popup) {
  document.addEventListener('keydown', handleDocumentKeyboardEvents);

  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', handleDocumentKeyboardEvents);
}

function handleProfileFormSubmit(evt) {
  userName.textContent = inputUserName.value;
  userJob.textContent = inputUserJob.value;

  closePopup(popupEdit);
}

function handleAddFormSubmit(evt) {
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
  popupPhoto.querySelector('.popup__photo').src = evt.target.src;
  popupPhoto.querySelector('.popup__photo-caption').textContent = evt.target.alt;

  openPopup(popupPhoto);
}

function handlEditButtonClick(popup) {
  fillEditProfilePopup();

  const formInputs = [inputUserName, inputUserJob];
  const submitButton = formEditProfile.querySelector(pageConfig.submitButtonSelector);

  toggleSubmitButtonState(formInputs, submitButton, pageConfig);
  
  openPopup(popup);
  inputUserName.focus();
}

function handleAddButtonClick(popup) {
  const formInputs = [inputPlace, inputPlaceLink];
  const submitButton = formAddPlace.querySelector(pageConfig.submitButtonSelector);

  toggleSubmitButtonState(formInputs, submitButton, pageConfig);
  
  openPopup(popup);
  inputPlace.focus();
}

function handleDocumentKeyboardEvents(evt) {
  if (evt.key === 'Escape') { 
    const openedPopup = document.querySelector('.popup_opened');
     if (openedPopup) {
       closePopup(openedPopup);
     }
  }
}