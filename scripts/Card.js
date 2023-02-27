export class Card {
  constructor(data, templateSelector, photoPopUpHandler) {
    this._title = data.title;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._photoPopUpHandler = photoPopUpHandler;
  }

  _getTemplate() {
    const cardsTemplate = document.querySelector(this._templateSelector).content.querySelector('.elements__item').cloneNode(true);
    return cardsTemplate;
  }

  _toggleLikeButton() {
    this.cardsItemLikeButton.classList.toggle('button_type_like-active');
    console.log(this.cardsItemLikeButton);
  }

  _removeCard() {
    this.cardsItem.remove();
  }

  _addEventListeners() {
    this.cardsItemPhoto.addEventListener('click', () => {
      this._photoPopUpHandler(this._title, this._link);
    });

    this.cardsItemLikeButton.addEventListener('click', () => {this._toggleLikeButton()});

    this.cardsItemDeleteButton.addEventListener('click', () => {this._removeCard()});
  }

  assembleCard() {
    this.cardsItem = this._getTemplate();
    this.cardsItemPhoto = this.cardsItem.querySelector('.elements__photo');
    this.cardsItemTitle = this.cardsItem.querySelector('.elements__title');
    this.cardsItemLikeButton = this.cardsItem.querySelector('.button_type_like');
    this.cardsItemDeleteButton = this.cardsItem.querySelector('.button_type_delete');

    this.cardsItemPhoto.src = this._link;
    this.cardsItemPhoto.alt = this._title;
    this.cardsItemTitle.textContent = this._title;

    this._addEventListeners();

    return this.cardsItem;
  };
}
