//ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ

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
const profileEditFormContainer = profileEditPopUp.querySelector('.popup__form-container');

//Карточки
const cardsList = document.querySelector('.elements__items');
const cardsTemplate = document.querySelector('#cardsItem-template').content;
const cardsAddNewButton = document.querySelector('.button_type_add');
const cardsAddNewPopUp = document.querySelector('#cardsAddNewPopUp');
const cardsAddNewForm = document.forms.popupAddCard;
const cardsTitleInput = document.forms.popupAddCard.popupInputName;
const cardsLinkInput = document.forms.popupAddCard.popupInputImage;
const cardsSubmitButton = document.forms.popupAddCard.popupSubmit;
const cardsAddNewFormContainer = cardsAddNewPopUp.querySelector('.popup__form-container');

//Фото
const photoPopUp = document.querySelector('#photoPopUp');
const photoPopUpImage = photoPopUp.querySelector('.popup__photo');
const photoPopUpTitle = photoPopUp.querySelector('.popup__photo-title');
const photoPopUpContainer = photoPopUp.querySelector('.popup__form-container');

//ФУНКЦИИ

//Общие
function openPopUp(popUp) {
  popUp.classList.add('popup_opened');
  addFormEventListeners(popUp);
};

function closePopUp(popUp) {
  popUp.classList.remove('popup_opened');
  removeFormEventListeners(popUp);
  resetForm(popUp, validationConst);
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

function addFormEventListeners(popUp) {
  document.addEventListener('keydown', closePopUpOnEscPress);
  popUp.addEventListener('mousedown', closePopUpOnClickOutside);
  popUp.querySelector('.button_type_exit').addEventListener('click', closePopUpOnExitButton);
};

function removeFormEventListeners(popUp) {
  document.removeEventListener('keydown', closePopUpOnEscPress);
  popUp.removeEventListener('mousedown', closePopUpOnClickOutside);
  popUp.querySelector('.button_type_exit').removeEventListener('click', closePopUpOnExitButton);
};

function resetForm(popUp, validationSettings) {
  const formElement = popUp.querySelector('.popup__form');
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validationSettings);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationSettings);
  });

  formElement.reset();
}

//Редактирование профиля
function editProfile() {

  profileName.textContent = profileEditNameInput.value;
  profileJob.textContent = profileEditJobInput.value;

  closePopUp(profileEditPopUp);
};

//Карточки
function assembleCard(name, link) {
  const cardsItem = cardsTemplate.querySelector('.elements__item').cloneNode(true);
  const cardsItemPhoto = cardsItem.querySelector('.elements__photo');
  const cardsItemTitle = cardsItem.querySelector('.elements__title');

  cardsItemPhoto.src = link;
  cardsItemPhoto.alt = name;
  cardsItemTitle.textContent = name;

  cardsItem.querySelector('.elements__photo').addEventListener('click', () => {
    photoPopUpImage.src = link;
    photoPopUpImage.alt = name;
    photoPopUpTitle.textContent = name;
    openPopUp(photoPopUp);
  });

  cardsItem.querySelector('.button_type_like').addEventListener('click', evt => {
    evt.target.classList.toggle('button_type_like-active');
  });

  cardsItem.querySelector('.button_type_delete').addEventListener('click', () => {
    cardsItem.remove();
  });

  return cardsItem;
};

function addCard(title, link) {
  const card = assembleCard(title, link);
  cardsList.prepend(card);
};

initialCards.forEach(function(element) {
  addCard(element.name, element.link);
});

function addNewCard() {

  const cardsLink = cardsLinkInput.value;
  const cardsTitle = cardsTitleInput.value;

  addCard(cardsTitle, cardsLink);

  cardsAddNewForm.reset();
  closePopUp(cardsAddNewPopUp);
};

//КНОПКИ

//Редактирование профиля
profileEditButton.addEventListener('click', () => {
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
  openPopUp(cardsAddNewPopUp);
});

cardsAddNewForm.addEventListener('submit', () => {
  if(!cardsSubmitButton.hasAttribute('disabled')) {
    addNewCard();
  }
});

