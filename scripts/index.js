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

  elementsItem.querySelector('.button_type_like').addEventListener('click', function(event) {
    event.target.classList.toggle('button_type_like-active');
  });

  elementsItem.querySelector('.button_type_delete').addEventListener('click', function() {
    elementsItem.remove();
  })

  elementsItems.append(elementsItem);
});

function addCard(event) {
  event.preventDefault();

  const elementsItem = elementsItemTemplate.querySelector('.elements__item').cloneNode(true);

  elementsItem.querySelector('.elements__photo').src = cardLinkInput.value;
  elementsItem.querySelector('.elements__photo').alt = cardNameInput.value;
  elementsItem.querySelector('.elements__title').textContent = cardNameInput.value;

  elementsItem.querySelector('.button_type_like').addEventListener('click', function(event){
    event.target.classList.toggle('button_type_like-active');
  });

  elementsItem.querySelector('.button_type_delete').addEventListener('click', function() {
    elementsItem.remove();
  })

  elementsItems.prepend(elementsItem);

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
