class FormValidator {
  constructor(validationSettings, formElement) {
    this._formElement = formElement;
    this._validationSettings = validationSettings;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationSettings.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._validationSettings.submitButtonSelector);
  }

  //Добавить обработчики событий к полям ввода
  _setEventListeners() {

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
       });
    });

  };

  //Валидировать элемент ввода
  _checkInputValidity(inputElement) {

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    };

  };

  //Показать сообщение об ошибке
  _showInputError(inputElement, errorMessage) {

    const errorElement = this._formElement.querySelector(`${this._validationSettings.errorElementSelector}${inputElement.name}`);
    inputElement.classList.add(this._validationSettings.inputErrorClass);
    errorElement.classList.add(this._validationSettings.errorClass);
    errorElement.textContent = errorMessage;

  }

  //Спрятать сообщение об ошибке
  _hideInputError(inputElement) {

    const errorElement = this._formElement.querySelector(`${this._validationSettings.errorElementSelector}${inputElement.name}`);
    inputElement.classList.remove(this._validationSettings.inputErrorClass);
    errorElement.classList.remove(this._validationSettings.errorClass);
    errorElement.textContent = '';

  }

  //Валидировать форму
  _hasInvalidInput() {

    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });

  };

  //Сменить состояние кнопки отправления в зависимости от валидации формы
  _toggleButtonState() {

    if(this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._validationSettings.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', '');
    } else {
      this._buttonElement.classList.remove(this._validationSettings.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled', '');
    }

  }

  //Сбросить состояние формы
  resetFormErrors() {

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

  }

  //Запустить валидацию форм
  enableValidation() {

    this._toggleButtonState();
    this._setEventListeners();

  };
}

export {FormValidator};
