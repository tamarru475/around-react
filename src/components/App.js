import React from "react";
import Header from "./header";
import Main from "./main";
import Footer from "./footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./imagePopup";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    visibility: false,
  });

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleDeletePopupClick() {
    setDeletePopupOpen(true);
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
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeletePopupOpen(false);
    setSelectedCard(false);
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
            <fieldset className="form__fieldset-button">
              <button
                type="submit"
                className="form__button form__button-save"
                disabled
              >
                Save
              </button>
            </fieldset>
          </PopupWithForm>
          <PopupWithForm
            name="edit"
            title="Edit profile"
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
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
            <fieldset className="form__fieldset-button">
              <button type="submit" className="form__button form__button-save">
                Save
              </button>
            </fieldset>
          </PopupWithForm>
          <PopupWithForm
            name="add"
            title="New place"
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
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
            <fieldset className="form__fieldset-button">
              <button
                type="submit"
                className="form__button form__button-create"
                disabled
              >
                Create
              </button>
            </fieldset>
          </PopupWithForm>
          <PopupWithForm
            name="delete"
            title="Are you sure?"
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
          >
            <button type="submit" className="delete__form-button button">
              Yes
            </button>
          </PopupWithForm>
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </Main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
