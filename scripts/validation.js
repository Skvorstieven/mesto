//Запустить валидацию форм
function enableValidation(validationSettings) {

  const formList = Array.from(document.forms);

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, validationSettings);
  });
};

//Добавить обработчики событий к полям ввода
function setEventListeners(formElement, validationSettings) {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationSettings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationSettings);
      toggleButtonState(inputList, buttonElement, validationSettings);
    });
  });
};

//Валидировать элемент ввода
function checkInputValidity(formElement, inputElement, validationSettings) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
  } else {
    hideInputError(formElement, inputElement, validationSettings);
  };
};

//Показать сообщение об ошибке
function showInputError(formElement, inputElement, errorMessage, validationSettings) {
  const errorElement = formElement.querySelector(`${validationSettings.errorElementSelector}${inputElement.name}`);
  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.classList.add(validationSettings.errorClass);
  errorElement.textContent = errorMessage;
}

//Спрятать сообщение об ошибке
function hideInputError(formElement, inputElement, validationSettings) {
  const errorElement = formElement.querySelector(`${validationSettings.errorElementSelector}${inputElement.name}`);
  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.classList.remove(validationSettings.errorClass);
  errorElement.textContent = '';
}

//Валидировать форму
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};


//Сменить состояние кнопки отправления в зависимости от валидации формы
function toggleButtonState (inputList, buttonElement, validationSettings) {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationSettings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  } else {
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', '');
  }
}

//Сбросить состояние формы
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

enableValidation(validationConst);
