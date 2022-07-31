import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import {
  ValidationContext,
  errorMessages,
} from "../contexts/ValidationContext";
import { api } from "../utils/api";

function App() {
  /// Popup open/close status ///
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = React.useState(false);

  /// Card hookes ///

  const [cards, setCards] = React.useState([]);

  const [selectedCard, setSelectedCard] = React.useState({
    visibility: false,
  });

  /// Context hooks ///
  const [currentUser, setCurrentUser] = React.useState({});
  const [valid, setValid] = React.useState(true);

  /// Initial requests from api ///

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser({
          avatar: userData.avatar,
          about: userData.about,
          name: userData.name,
          _id: userData._id,
        });
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
  }, []);

  /// Popup open/close handlers ///

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeletePopupClick(cardData) {
    setDeletePopupOpen(true);
    setSelectedCard({ _id: cardData._id });
  }

  function handleCardClick(cardData) {
    setSelectedCard({
      ...selectedCard,
      visibility: true,
      name: cardData.name,
      link: cardData.link,
    });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setDeletePopupOpen(false);
    setSelectedCard({ visibility: false });
  }

  /// Likes & Delete Card ///
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
    closeAllPopups();
  }

  /// After Submit updaters ///
  function handleUpdateAvatar(inputData) {
    api
      .setUserAavatar(inputData)
      .then((updatedInfo) => {
        setCurrentUser({
          ...currentUser,
          avatar: updatedInfo.avatar,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    closeAllPopups();
  }

  function handleUpdateUser(inputData) {
    api
      .setUserInfo(inputData)
      .then((updatedInfo) => {
        setCurrentUser({
          ...currentUser,
          name: updatedInfo.name,
          about: updatedInfo.about,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    closeAllPopups();
  }

  function handleAddPlaceSubmit(inputData) {
    api
      .setNewCard(inputData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        console.log(err);
      });
    closeAllPopups();
  }

  return (
    <div className="App">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main
            onEditAvatarClick={handleEditAvatarClick}
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onTrashClick={handleDeletePopupClick}
            onCardClick={handleCardClick}
            cardsArray={cards}
            onCardDelete={handleCardDelete}
            onLikeClick={handleCardLike}
          >
            <ValidationContext.Provider value={errorMessages}>
              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
              />
              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                isValid={valid}
                setValid={setValid}
              />
              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlaceSubmit={handleAddPlaceSubmit}
                isValid={valid}
                setValid={setValid}
              />
            </ValidationContext.Provider>
            <DeleteCardPopup
              isOpen={isDeletePopupOpen}
              onClose={closeAllPopups}
              onCardDelete={handleCardDelete}
              card={selectedCard}
            />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          </Main>
          <Footer />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
