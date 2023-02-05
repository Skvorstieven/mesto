//Переменные
const formList = Array.from(document.forms);

//Отменить отправку формы по умолчанию
function preventDefaultForm() {
  formList.forEach(() => {
    addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
  })
}

//Запустить валидацию форм
function enableValidation() {
formList.forEach((formElement) => {
  setEventListeners(formElement);
})
}

//Добавить обработчики событий к полям ввода
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.button_type_submit');
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//Валидировать элемент ввода
function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  };
};

//Показать сообщение об ошибке
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.popup__input-error_type_${inputElement.name}`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.classList.add('popup__input-error_active');
  errorElement.textContent = errorMessage;
}

//Спрятать сообщение об ошибке
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.popup__input-error_type_${inputElement.name}`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
}

//Валидировать форму
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};


//Сменить состояние кнопки отправления в зависимости от валидации формы
function toggleButtonState (inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add('button_disabled');
    buttonElement.setAttribute('disabled', '');
  } else {
    buttonElement.classList.remove('button_disabled');
    buttonElement.removeAttribute('disabled', '');
  }
}

preventDefaultForm();
enableValidation();
