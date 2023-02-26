//ИМПОРТ И ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ
import {initialCards, validationConst} from './constants.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

//Общие
const popUps = Array.from(document.querySelectorAll('.popup'));

//Редактирование профиля
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__title');
const profileJob = profile.querySelector('.profile__subtitle');
const profileEditButton = profile.querySelector('.button_type_edit');
const profileEditPopUp = document.querySelector('#profileEditPopUp');
const profileEditForm = document.forms.popupEditProfile
const profileEditNameInput = document.forms.popupEditProfile.popupInputName;
const profileEditJobInput = document.forms.popupEditProfile.popupInputJob;
const profileEditFormValidator = new FormValidator(validationConst, profileEditForm);
profileEditFormValidator.enableValidation();


//Карточки
const cardsList = document.querySelector('.elements__items');
const cardsAddNewButton = document.querySelector('.button_type_add');
const cardsAddNewPopUp = document.querySelector('#cardsAddNewPopUp');
const cardsAddNewForm = document.forms.popupAddCard;
const cardsTitleInput = document.forms.popupAddCard.popupInputName;
const cardsLinkInput = document.forms.popupAddCard.popupInputImage;
const cardsAddNewFormValidator = new FormValidator(validationConst, cardsAddNewForm);
cardsAddNewFormValidator.enableValidation();

//Фото попап
const photoPopUp = document.querySelector('#photoPopUp');
const photoPopUpImage = photoPopUp.querySelector('.popup__photo');
const photoPopUpTitle = photoPopUp.querySelector('.popup__photo-title');

//ФУНКЦИИ

//Общие
export function openPopUp(popUp) {
  popUp.classList.add('popup_opened');
  addPopUpKeydownEventListener();
};

function closePopUp(popUp) {
  popUp.classList.remove('popup_opened');
  removePopUpKeydownEventListener();
};

function closePopUpOnExitButton(popUp) {
  closePopUp(popUp);
};

function closePopUpOnEscPress(evt) {
  if(evt.key === 'Escape'||evt.key === 'Esc') {
    closePopUp(document.querySelector('.popup_opened'));
  };
};

function closePopUpOnClickOutside(evt) {
  if(evt.target === evt.currentTarget) {
    closePopUp(evt.currentTarget);
  };
};

function addPopUpEventListeners(popUp) {
  popUp.addEventListener('mousedown', closePopUpOnClickOutside);
  popUp.querySelector('.button_type_exit').addEventListener('click', () => {closePopUpOnExitButton(popUp)});
};

function addPopUpKeydownEventListener() {
  document.addEventListener('keydown', closePopUpOnEscPress);
};

function removePopUpKeydownEventListener() {
  document.removeEventListener('keydown', closePopUpOnEscPress);
};

//Редактирование профиля
function editProfile() {

  profileName.textContent = profileEditNameInput.value;
  profileJob.textContent = profileEditJobInput.value;

  closePopUp(profileEditPopUp);
};

//Карточки
function createCard(data, templateSelector) {
  const card = new Card(data, templateSelector, handleOpenPhotoPopUp);
  const cardElement = card.assembleCard();
  return cardElement;
};

function addCard(data, templateSelector) {
  const cardElement = createCard(data, templateSelector);
  cardsList.prepend(cardElement);
};

initialCards.forEach(function(element) {
  addCard(element, '.elements__item-template');
});

function addNewCard() {

  const data = {
    title: cardsTitleInput.value,
    link: cardsLinkInput.value
  }

  addCard(data, '.elements__item-template');

  cardsAddNewForm.reset();
  closePopUp(cardsAddNewPopUp);
};

function handleOpenPhotoPopUp(title, link) {
  photoPopUpImage.src = link;
  photoPopUpImage.alt = title;
  photoPopUpTitle.textContent = title;
  openPopUp(photoPopUp);
}

//КНОПКИ

//Общие
popUps.forEach((popUp) => {
  addPopUpEventListeners(popUp);
});



//Редактирование профиля
profileEditButton.addEventListener('click', () => {
  profileEditFormValidator.resetFormErrors();
  profileEditForm.reset();
  profileEditNameInput.value = profileName.textContent;
  profileEditJobInput.value = profileJob.textContent;
  openPopUp(profileEditPopUp);
});

profileEditForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  editProfile();
});

//Добавление новой карточки
cardsAddNewButton.addEventListener('click', () => {
  cardsAddNewFormValidator.resetFormErrors();
  cardsAddNewForm.reset();
  openPopUp(cardsAddNewPopUp);
});

cardsAddNewForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addNewCard();
});
