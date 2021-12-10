export const cardsContainerSelector = '.places';
export const popupAddSelector = '.popup_add';
export const popupEditSelector = '.popup_edit';
export const popupEditAvatarSelector = '.popup_edit-avatar';
export const popupPhotoSelector = '.popup_photo';
export const popupConfirmationSelector = '.popup_delete';

export const buttonEditElement = document.querySelector('.profile__edit-button');
export const buttonAddElement = document.querySelector('.profile__add-button');
export const buttonEditAvatarElement = document.querySelector('.profile__avatar-overlay');

export const forms = Array.from(document.forms);
export const formProfile = document.forms.formEditProfile;
export const formAdd = document.forms.formAddPlace;
export const formEditAvatar = document.forms.formEditAvatar;

export const inputUserName = formProfile.elements.name;
export const inputUserJob = formProfile.elements.about;
export const inputPlace = formAdd.elements.name;
export const inputAvatarUrl = formEditAvatar.elements.avatar;

export const data = {
  formSelector: '.popup__form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__input-error_active',
};