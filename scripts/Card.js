const photoPopUp = document.querySelector('#photoPopUp');
const photoPopUpImage = photoPopUp.querySelector('.popup__photo');
const photoPopUpTitle = photoPopUp.querySelector('.popup__photo-title');

import { openPopUp } from "./index.js";

export class Card {
  constructor(data, templateSelector) {
    this._title = data.title;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardsTemplate = document.querySelector(`#${this._templateSelector}`).content.querySelector('.elements__item').cloneNode(true);
    return cardsTemplate;
  }

  _addEventListeners(item) {
    item.querySelector('.elements__photo').addEventListener('click', () => {
      photoPopUpImage.src = this._link;
      photoPopUpImage.alt = this._title;
      photoPopUpTitle.textContent = this._title;
      openPopUp(photoPopUp);
    });

    item.querySelector('.button_type_like').addEventListener('click', evt => {
      evt.target.classList.toggle('button_type_like-active');
    });

    item.querySelector('.button_type_delete').addEventListener('click', () => {
      item.remove();
    });
  }

  assembleCard() {
    const cardsItem = this._getTemplate();
    const cardsItemPhoto = cardsItem.querySelector('.elements__photo');
    const cardsItemTitle = cardsItem.querySelector('.elements__title');

    cardsItemPhoto.src = this._link;
    cardsItemPhoto.alt = this._title;
    cardsItemTitle.textContent = this._title;

    this._addEventListeners(cardsItem);

    return cardsItem;
  };
}
