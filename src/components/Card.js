export default class Card {
  constructor({
    cardContent: {
      name,
      link,
      likes, 
      owner: { _id: cardOwnerId },
      _id: cardId
    }, templateSelector, userId, handleCardClick, handleDeleteClick, handleLikeClick}) {

    this._name = name;
    this._link = link;
    this._userId = userId;
    this._cardOwnerId = cardOwnerId;
    this._isOwner = userId === cardOwnerId ? true : false;
    this._cardId = cardId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;

    this._placeElement = this._getTemplate();
    this._placeElement.id = this._cardId;

    this._buttonLike = this._placeElement.querySelector('.place__like-button');
    this._buttonDelete = this._placeElement.querySelector('.place__delete-button');
    this._placeCover = this._placeElement.querySelector('.place__cover');
    this._placeTitle = this._placeElement.querySelector('.place__title');
    this._placeLikeCounter = this._placeElement.querySelector('.place__like-counter');

    if (!this._isOwner) { this._buttonDelete.remove() }

    this._placeTitle.textContent = this._name;
    this._placeCover.src = this._link;
    this._placeCover.alt = this._name;

    this._setEventListeners();
    this.updateLikes(likes);
  }

  updateLikes(likes) {
    this._likes = likes;
    this._placeLikeCounter.textContent = likes.length;
    this._setLikedStatus(likes);
  }

  _setLikedStatus(likes) {
    const likesOwnersIds = likes.map(like => like._id);

    if (likesOwnersIds.includes(this._userId)) {
      this._isLiked = true;
      this._buttonLike.classList.add('place__like-button_active');
    } else {
      this._isLiked = false;
      this._buttonLike.classList.remove('place__like-button_active');
    }
  }
  
  _getTemplate() {
    this._cardTemplate = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.place')
      .cloneNode(true);

    return this._cardTemplate;
  }
  
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick(this._cardId, this._isLiked);
    })

    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteClick(this._cardId);
    })

    this._placeCover.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
  }

  generateCard() {
    return this._placeElement;
  }
}