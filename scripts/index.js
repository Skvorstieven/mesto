//ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ

//Редактирование профиля
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__title');
const profileJob = profile.querySelector('.profile__subtitle');
const editProfileButton = profile.querySelector('.button_type_edit');
const editProfilePopUp = document.querySelector('#editProfilePopUp');
const editProfileForm = editProfilePopUp.querySelector('.popup__form');
const exitEditProfilePopUp = editProfilePopUp.querySelector('.button_type_exit');
const nameInput = editProfilePopUp.querySelector('.popup__input_type_name');
const jobInput = editProfilePopUp.querySelector('.popup__input_type_job');

//Карточки
const elementsItems = document.querySelector('.elements__items');
const initialCards = [
  {
    name:'Гора Эльбрус',
    link:'./images/elements/elbrus.jpg'
  },
  {
    name:'Ергаки',
    link:'./images/elements/ergaki.jpg'
  },
  {
    name:'Камчатка',
    link:'./images/elements/kamchatka.jpg'
  },
  {
    name:'Кижи',
    link:'./images/elements/kizhi.jpg'
  },
  {
    name:'Урал',
    link:'./images/elements/ural.jpg'
  },
  {
    name:'Река Волга',
    link:'./images/elements/volga.jpg'
  },
];
const elementsItemTemplate = document.querySelector('#elementsItem-template').content;
const addCardButton = document.querySelector('.button_type_add');
const addCardPopUp = document.querySelector('#addCardPopUp');
const exitAddCardPopUp = addCardPopUp.querySelector('.button_type_exit');
const cardNameInput = addCardPopUp.querySelector('.popup__input_type_name');
const cardLinkInput = addCardPopUp.querySelector('.popup__input_type_link');
const addCardForm = addCardPopUp.querySelector('.popup__form');

//Фото
const photoPopUp = document.querySelector('#photoPopUp');
const exitPhotoPopUp = photoPopUp.querySelector('.button_type_exit');

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

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopUp(editProfilePopUp);
};

//Карточки
initialCards.forEach(function(element) {
  const elementsItem = elementsItemTemplate.querySelector('.elements__item').cloneNode(true);

  elementsItem.querySelector('.elements__photo').src = element.link;
  elementsItem.querySelector('.elements__photo').alt = element.name;
  elementsItem.querySelector('.elements__title').textContent = element.name;

  elementsItem.querySelector('.elements__photo').addEventListener('click', function() {
    photoPopUp.querySelector('.popup__photo').src = element.link;
    photoPopUp.querySelector('.popup__photo').alt = element.name;
    photoPopUp.querySelector('.popup__photo-title').textContent = element.name;
    openPopUp(photoPopUp);
  })

  elementsItem.querySelector('.button_type_like').addEventListener('click', function(event) {
    event.target.classList.toggle('button_type_like-active');
  });

  elementsItem.querySelector('.button_type_delete').addEventListener('click', function() {
    elementsItem.classList.remove('elements__item_show');
    setTimeout(() => {elementsItem.remove()}, 500);
  })

  elementsItems.append(elementsItem);
  setTimeout(() => {elementsItem.classList.add('elements__item_show')});
});

function addCard(event) {
  event.preventDefault();

  const elementsItem = elementsItemTemplate.querySelector('.elements__item').cloneNode(true);
  const cardLink = cardLinkInput.value;
  const cardName = cardNameInput.value;

  elementsItem.querySelector('.elements__photo').src = cardLink;
  elementsItem.querySelector('.elements__photo').alt = cardName;
  elementsItem.querySelector('.elements__title').textContent = cardName;

  elementsItem.querySelector('.elements__photo').addEventListener('click', function() {
    photoPopUp.querySelector('.popup__photo').src = cardLink;
    photoPopUp.querySelector('.popup__photo').alt = cardName;
    photoPopUp.querySelector('.popup__photo-title').textContent = cardName;
    openPopUp(photoPopUp);
  })

  elementsItem.querySelector('.button_type_like').addEventListener('click', function(event){
    event.target.classList.toggle('button_type_like-active');
  });

  elementsItem.querySelector('.button_type_delete').addEventListener('click', function() {
    elementsItem.classList.remove('elements__item_show');
    setTimeout(() => {elementsItem.remove()}, 500);
  })

  elementsItems.prepend(elementsItem);
  setTimeout(() => {elementsItem.classList.add('elements__item_show')});

  cardNameInput.value = '';
  cardLinkInput.value = '';
  closePopUp(addCardPopUp);
};

//КНОПКИ

//Редактирование профиля
editProfileButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  openPopUp(editProfilePopUp);
});

exitEditProfilePopUp.addEventListener('click', function() {
  closePopUp(editProfilePopUp);
});

editProfileForm.addEventListener('submit', editProfile);

//Добавление новой карточки
addCardButton.addEventListener('click', function() {
  openPopUp(addCardPopUp);
});

exitAddCardPopUp.addEventListener('click', function() {
  closePopUp(addCardPopUp);
});

addCardForm.addEventListener('submit', addCard);

//Фото

exitPhotoPopUp.addEventListener('click', function() {
  closePopUp(photoPopUp);
})
