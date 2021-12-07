import baliImage from '../images/place-image-bali.jpg';
import canadaImage from '../images/place-image-canada.jpg';
import dubaiImage from '../images/place-image-dubai.jpg';
import japanImage from '../images/place-image-japan.jpg';
import norwayImage from '../images/place-image-norway.jpg';
import usaImage from '../images/place-image-usa.jpg';

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

export const data = {
  formSelector: '.popup__form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__input-error_active',
};

export const initialCardsContent = [
  {
    name: 'Бали',
    link: baliImage,
  },
  {
    name: 'Канада',
    link: canadaImage,
  },
  {
    name: 'Дубай, Эмираты',
    link: dubaiImage,
  },
  {
    name: 'Япония',
    link: japanImage,
  },
  {
    name: 'Норвегия',
    link: norwayImage,
  },
  {
    name: 'США',
    link: usaImage,
  },
];