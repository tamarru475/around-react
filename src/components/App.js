import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    visibility: false,
  });

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeletePopupClick() {
    setIsDeletePopupOpen(true);
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
    setIsDeletePopupOpen(false);
    setSelectedCard({ visibility: false });
  }

  return (
    <div className="App">
      <div className="page">
        <Header />
        <Main
          onEditAvatarClick={handleEditAvatarClick}
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onTrashClick={handleDeletePopupClick}
        >
          <PopupWithForm
            name="avatar"
            title="Change profile picture"
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            buttonText="Save"
          >
            <fieldset className="form__fieldset">
              <span className="form__input-error title-input-error"></span>
              <input
                className="form__input"
                type="url"
                id="avatar-input"
                placeholder="Image link"
                name="avatar"
                required
              />
              <span className="form__input-error avatar-input-error"></span>
            </fieldset>
          </PopupWithForm>
          <PopupWithForm
            name="edit"
            title="Edit profile"
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            buttonText="Save"
          >
            <fieldset className="form__fieldset">
              <input
                className="form__input form__input-name"
                type="text"
                id="name-input"
                placeholder="Name"
                name="name"
                required
              />
              <span className="form__input-error name-input-error"></span>
              <input
                className="form__input form__input-job"
                type="text"
                id="job-input"
                placeholder="About"
                name="job"
                required
              />
              <span className="form__input-error job-input-error"></span>
            </fieldset>
          </PopupWithForm>
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
          <PopupWithForm
            name="delete"
            title="Are you sure?"
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            buttonText="Yes"
          ></PopupWithForm>
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </Main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
