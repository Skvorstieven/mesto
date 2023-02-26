//ИМПОРТ И ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ
import {initialCards, validationConst} from './constants.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

//Редактирование профиля
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__title');
const profileJob = profile.querySelector('.profile__subtitle');
const profileEditButton = profile.querySelector('.button_type_edit');
const profileEditPopUp = document.querySelector('#profileEditPopUp');
const profileEditForm = document.forms.popupEditProfile
const profileEditNameInput = document.forms.popupEditProfile.popupInputName;
const profileEditJobInput = document.forms.popupEditProfile.popupInputJob;
const profileEditSubmitButton = document.forms.popupEditProfile.popupSubmit;

//Карточки
const cardsList = document.querySelector('.elements__items');
const cardsAddNewButton = document.querySelector('.button_type_add');
const cardsAddNewPopUp = document.querySelector('#cardsAddNewPopUp');
const cardsAddNewForm = document.forms.popupAddCard;
const cardsTitleInput = document.forms.popupAddCard.popupInputName;
const cardsLinkInput = document.forms.popupAddCard.popupInputImage;
const cardsSubmitButton = document.forms.popupAddCard.popupSubmit;

//ФУНКЦИИ

//Общие
export function openPopUp(popUp) {
  popUp.classList.add('popup_opened');
  addPopUpEventListeners(popUp);
};

function closePopUp(popUp) {
  popUp.classList.remove('popup_opened');
  removePopUpEventListeners(popUp);
};

function closePopUpOnExitButton() {
  closePopUp(document.querySelector('.popup_opened'));
};

function closePopUpOnEscPress(evt) {
  if(evt.key === 'Escape'||evt.key === 'Esc') {
    closePopUp(document.querySelector('.popup_opened'));
  };
};

function closePopUpOnClickOutside(evt) {
  if(evt.target === evt.currentTarget) {
    closePopUp(document.querySelector('.popup_opened'));
  };
};

function addPopUpEventListeners(popUp) {
  document.addEventListener('keydown', closePopUpOnEscPress);
  popUp.addEventListener('mousedown', closePopUpOnClickOutside);
  popUp.querySelector('.button_type_exit').addEventListener('click', closePopUpOnExitButton);
};

function removePopUpEventListeners(popUp) {
  document.removeEventListener('keydown', closePopUpOnEscPress);
  popUp.removeEventListener('mousedown', closePopUpOnClickOutside);
  popUp.querySelector('.button_type_exit').removeEventListener('click', closePopUpOnExitButton);
};

//Редактирование профиля
function editProfile() {

  profileName.textContent = profileEditNameInput.value;
  profileJob.textContent = profileEditJobInput.value;

  closePopUp(profileEditPopUp);
};

//Карточки
function addCard(data, templateSelector) {
  const card = new Card(data, templateSelector);
  const cardElement = card.assembleCard();
  cardsList.prepend(cardElement);
};

initialCards.forEach(function(element) {
  addCard(element, 'cardsItem-template');
});

function addNewCard() {

  const data = {
    title: cardsTitleInput.value,
    link: cardsLinkInput.value
  }

  addCard(data, 'cardsItem-template');

  cardsAddNewForm.reset();
  closePopUp(cardsAddNewPopUp);
};

//КНОПКИ

//Редактирование профиля
profileEditButton.addEventListener('click', () => {
  const form = new FormValidator(validationConst, profileEditForm);
  form.enableValidation();
  form.resetForm();
  profileEditNameInput.value = profileName.textContent;
  profileEditJobInput.value = profileJob.textContent;
  openPopUp(profileEditPopUp);

});

profileEditForm.addEventListener('submit', () => {
  if(!profileEditSubmitButton.hasAttribute('disabled')) {
    editProfile();
  }
});

//Добавление новой карточки
cardsAddNewButton.addEventListener('click', () => {
  const form = new FormValidator(validationConst, cardsAddNewForm);
  form.enableValidation();
  form.resetForm();
  openPopUp(cardsAddNewPopUp);
});

cardsAddNewForm.addEventListener('submit', () => {
  if(!cardsSubmitButton.hasAttribute('disabled')) {
    addNewCard();
  }
});
