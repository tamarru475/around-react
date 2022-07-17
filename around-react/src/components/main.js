import React from "react";
import { api } from "../utils/api";

let userId;

export default function Main(props) {
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        userId = userData._id;

        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__image-container">
            <img
              src={userAvatar}
              alt="profile picture"
              className="profile__image"
              onClick={props.onEditAvatarClick}
            />
            <div className="profile__image-overlay"></div>
          </div>
          <div className="profile__info">
            <h1 className="profile__name" id="profile-name">
              {userName}
            </h1>
            <button
              type="button"
              className="profile__edit-button profile-button"
              onClick={props.onEditProfileClick}
            ></button>
            <p className="profile__name-discription" id="profile-job">
              {userDescription}
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
          {cards.map((card) => (
            <li className="gallery__card" key={card._id}>
              <div
                className="gallery__card-image"
                style={{ backgroundImage: `url(${card.link})` }}
              ></div>
              <button
                type="button"
                className="gallery__card-trash-button gallery__card-trash-button_active"
              ></button>
              <div className="gallery__card-footer">
                <h2 className="gallery__card-place">{card.name}</h2>
                <div className="gallery__card-like">
                  <button
                    type="button"
                    className="gallery__card-like_button"
                  ></button>
                  <div className="gallery__card-like_counter">
                    {card.likes.length}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
