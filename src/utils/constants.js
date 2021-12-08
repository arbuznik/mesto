export const cardsContainerSelector = '.places';
export const popupAddSelector = '.popup_add';
export const popupEditSelector = '.popup_edit';
export const popupPhotoSelector = '.popup_photo';
export const popupConfirmationSelector = '.popup_delete';

export const popupEditElement = document.querySelector('.popup_edit');
export const buttonEditElement = document.querySelector('.profile__edit-button');
export const popupAddElelement = document.querySelector('.popup_add');
export const buttonAddElement = document.querySelector('.profile__add-button');

export const forms = Array.from(document.forms);
export const formProfile = document.forms.formEditProfile;
export const formAdd = document.forms.formAddPlace;

export const inputUserName = formProfile.elements.name;
export const inputUserJob = formProfile.elements.about;
export const inputPlace = formAdd.elements.name;

export const userId = '764fef4607b228a9bcef2ef1';

export const data = {
  formSelector: '.popup__form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__input-error_active',
};