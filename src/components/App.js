import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";

function App() {
  /// Popup open/close status ///
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({
    visibility: false,
  });
  const [currentUser, setCurrentUser] = React.useState({});

  /// Initial request from api ///

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

    return () => {
      console.log("unmounted");
    };
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
    setSelectedCard({ visibility: false });
  }

  /// After Submit updaters ///
  function handleUpdateAvatar(inputData) {
    api.setUserAavatar(inputData).then((updatedInfo) => {
      setCurrentUser({
        ...currentUser,
        avatar: updatedInfo.avatar,
      });
    });
    closeAllPopups();
  }

  function handleUpdateUser(inputData) {
    api.setUserInfo(inputData).then((updatedInfo) => {
      setCurrentUser({
        ...currentUser,
        name: updatedInfo.name,
        about: updatedInfo.about,
      });
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
            onCardClick={handleCardClick}
          >
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <PopupWithForm
              name="add"
              title="New place"
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              buttonText="Create"
            >
              <fieldset className="form__fieldset">
                <input
                  className="form__input"
                  type="text"
                  id="title-input"
                  placeholder="Title"
                  name="title"
                  required
                />
                <span className="form__input-error title-input-error"></span>
                <input
                  className="form__input"
                  type="url"
                  id="imagelink-input"
                  placeholder="Image link"
                  name="image"
                  required
                />
                <span className="form__input-error imagelink-input-error"></span>
              </fieldset>
            </PopupWithForm>
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          </Main>
          <Footer />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
