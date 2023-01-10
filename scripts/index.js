let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__title');
let profileJob = profile.querySelector('.profile__subtitle');
let editProfileButton = profile.querySelector('.button_type_edit');

let editProfilePopUp = document.querySelector('.popup');
let editProfileForm = editProfilePopUp.querySelector('.popup__form');
let exitEditProfilePopUp = editProfilePopUp.querySelector('.button_type_exit');
let nameInput = editProfilePopUp.querySelector('.popup__input_type_name');
let jobInput = editProfilePopUp.querySelector('.popup__input_type_job');


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

editProfileButton.addEventListener('click', openPopUp);

exitEditProfilePopUp.addEventListener('click', closePopUp);

editProfileForm.addEventListener('submit', editProfile);

