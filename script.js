let profile = document.querySelector('.profile');
let editProfileButton = profile.querySelector('.edit-button');
let profileName = profile.querySelector('.profile__title');
let profileJob = profile.querySelector('.profile__subtitle');

let editProfilePopUp = document.querySelector('.edit-profile-popup');
let exitEditProfilePopUp = editProfilePopUp.querySelector('.exit-button');
let submitEdit = editProfilePopUp.querySelector('.edit-profile-popup__submit');


function openPopUp() {
  editProfilePopUp.classList.add('edit-profile-popup_opened');
}

function closePopUp() {
  editProfilePopUp.classList.remove('edit-profile-popup_opened');
}

function editProfile() {
  let nameInput = document.querySelector('#nameInput');
  let jobInput = document.querySelector('#jobInput');

  profileName.innerHTML = nameInput.value;
  profileJob.innerHTML = jobInput.value;
}

editProfileButton.addEventListener('click', openPopUp);

exitEditProfilePopUp.addEventListener('click', closePopUp);

submitEdit.addEventListener('click', editProfile);

