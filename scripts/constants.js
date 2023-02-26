const initialCards = [
  {
    title:'Гора Эльбрус',
    link:'./images/elements/elbrus.jpg'
  },
  {
    title:'Ергаки',
    link:'./images/elements/ergaki.jpg'
  },
  {
    title:'Камчатка',
    link:'./images/elements/kamchatka.jpg'
  },
  {
    title:'Кижи',
    link:'./images/elements/kizhi.jpg'
  },
  {
    title:'Урал',
    link:'./images/elements/ural.jpg'
  },
  {
    title:'Река Волга',
    link:'./images/elements/volga.jpg'
  },
];

const validationConst = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button_type_submit',
  errorElementSelector: '.popup__input-error_type_',
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

export {initialCards, validationConst};
