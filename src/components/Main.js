import React from "react";
import Card from "./Card";
import PopupWithForm from "./PopupWithForm";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main(props) {
  const [cards, setCards] = React.useState([]);
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((currentCard) => {
          return currentCard._id !== card._id;
        });
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__image-container">
            <img
              src={currentUser.avatar}
              alt="profile picture"
              className="profile__image"
              onClick={props.onEditAvatarClick}
            />
            <div className="profile__image-overlay"></div>
          </div>
          <div className="profile__info">
            <h1 className="profile__name" id="profile-name">
              {currentUser.name}
            </h1>
            <button
              type="button"
              className="profile__edit-button profile-button"
              onClick={props.onEditProfileClick}
            ></button>
            <p className="profile__name-discription" id="profile-job">
              {currentUser.about}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button profile-button"
          onClick={props.onAddPlaceClick}
        ></button>
      </section>
      {props.children}
      <section className="gallery">
        <ul className="gallery__container" id="gallery-container">
          <ul className="gallery__container" id="gallery-container">
            {cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={props.onCardClick}
                onCardDelete={handleCardDelete}
                onLikeClick={handleCardLike}
              />
            ))}
          </ul>
        </ul>
      </section>
    </main>
  );
}
