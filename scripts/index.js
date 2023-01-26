//ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ

//Редактирование профиля
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__title');
const profileJob = profile.querySelector('.profile__subtitle');
const profileEditButton = profile.querySelector('.button_type_edit');
const profileEditPopUp = document.querySelector('#profileEditPopUp');
const profileEditForm = profileEditPopUp.querySelector('.popup__form');
const profileEditPopUpExitButton = profileEditPopUp.querySelector('.button_type_exit');
const profileEditNameInput = profileEditPopUp.querySelector('.popup__input_type_name');
const profileEditJobInput = profileEditPopUp.querySelector('.popup__input_type_job');

//Карточки
const cardsList = document.querySelector('.elements__items');
const cardsTemplate = document.querySelector('#cardsItem-template').content;
const cardsAddNewButton = document.querySelector('.button_type_add');
const cardsAddNewPopUp = document.querySelector('#cardsAddNewPopUp');
const cardsAddNewPopUpExitButton = cardsAddNewPopUp.querySelector('.button_type_exit');
const cardsTitleInput = cardsAddNewPopUp.querySelector('.popup__input_type_name');
const cardsLinkInput = cardsAddNewPopUp.querySelector('.popup__input_type_link');
const cardsAddNewForm = cardsAddNewPopUp.querySelector('.popup__form');

//Фото
const photoPopUp = document.querySelector('#photoPopUp');
const photoPopUpImage = photoPopUp.querySelector('.popup__photo');
const photoPopUpTitle = photoPopUp.querySelector('.popup__photo-title');
const photoPopUpExitButton = photoPopUp.querySelector('.button_type_exit');

//ФУНКЦИИ

//Общие
function openPopUp(popUp) {
  popUp.classList.add('popup_opened');
};

function closePopUp(popUp) {
  popUp.classList.remove('popup_opened');
};

//Редактирование профиля
function editProfile(event) {
  event.preventDefault();

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

  cardsItem.querySelector('.elements__photo').addEventListener('click', function() {
    photoPopUpImage.src = link;
    photoPopUpImage.alt = name;
    photoPopUpTitle.textContent = name;
    photoPopUp.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    openPopUp(photoPopUp);
  })

  cardsItem.querySelector('.button_type_like').addEventListener('click', function(event) {
    event.target.classList.toggle('button_type_like-active');
  });

  cardsItem.querySelector('.button_type_delete').addEventListener('click', function() {
    cardsItem.classList.remove('elements__item_show');
    setTimeout(() => {cardsItem.remove()}, 500);
  });

  return cardsItem;
}

function addCard(title, link) {
  const card = assembleCard(title, link);

  cardsList.prepend(card);
  setTimeout(() => {card.classList.add('elements__item_show')});
}

initialCards.forEach(function(element) {
  addCard(element.name, element.link);
});

function addNewCard(event) {
  event.preventDefault();

  const cardsLink = cardsLinkInput.value;
  const cardsTitle = cardsTitleInput.value;

  addCard(cardsTitle, cardsLink);

  cardsAddNewForm.reset();
  closePopUp(cardsAddNewPopUp);
};

//КНОПКИ

//Редактирование профиля
profileEditButton.addEventListener('click', function() {
  profileEditNameInput.value = profileName.textContent;
  profileEditJobInput.value = profileJob.textContent;

  openPopUp(profileEditPopUp);
});

profileEditPopUpExitButton.addEventListener('click', function() {
  closePopUp(profileEditPopUp);
});

profileEditForm.addEventListener('submit', editProfile);

//Добавление новой карточки
cardsAddNewButton.addEventListener('click', function() {
  openPopUp(cardsAddNewPopUp);
});

cardsAddNewPopUpExitButton.addEventListener('click', function() {
  closePopUp(cardsAddNewPopUp);
});

cardsAddNewForm.addEventListener('submit', addNewCard);

//Фото

photoPopUpExitButton.addEventListener('click', function() {
  closePopUp(photoPopUp);
})
