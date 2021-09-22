let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button'); 
let saveButton = document.querySelector('.form__save-button');
let userName = document.querySelector('.profile__title');
let userJob = document.querySelector('.profile__subtitle');
let nameInput = document.querySelector('.form__input_type_name');
let jobInput = document.querySelector('.form__input_type_job');

nameInput.value = userName.textContent;
jobInput.value = userJob.textContent;

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
saveButton.addEventListener('submit', formSubmitHandler);

function togglePopup() {
  popup.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  togglePopup();
}