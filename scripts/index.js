// Объявление переменных

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__title');
const profileJob = profile.querySelector('.profile__subtitle');
const editProfileButton = profile.querySelector('.button_type_edit');

const editProfilePopUp = document.querySelector('.popup');
const editProfileForm = editProfilePopUp.querySelector('.popup__form');
const exitEditProfilePopUp = editProfilePopUp.querySelector('.button_type_exit');
const nameInput = editProfilePopUp.querySelector('.popup__input_type_name');
const jobInput = editProfilePopUp.querySelector('.popup__input_type_job');

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
]



//Функции

function openPopUp() {
  editProfilePopUp.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopUp() {
  editProfilePopUp.classList.remove('popup_opened');
}

function editProfile(event) {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopUp();
}

initialCards.forEach(function(element) {
  const elementsItemTemplate = document.querySelector('#elementsItem-template').content;
  const elementsItem = elementsItemTemplate.querySelector('.elements__item').cloneNode(true);

  elementsItem.querySelector('.elements__photo').src = element.link;
  elementsItem.querySelector('.elements__photo').alt = element.name;
  elementsItem.querySelector('.elements__title').textContent = element.name;

  console.log(element.name);
  elementsItems.append(elementsItem);
});

//Кнопки

editProfileButton.addEventListener('click', openPopUp);

exitEditProfilePopUp.addEventListener('click', closePopUp);

editProfileForm.addEventListener('submit', editProfile);
