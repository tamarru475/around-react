import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [title, setTitle] = React.useState("");
  const [link, setlink] = React.useState("");

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onLinkChange = (e) => {
    setlink(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlaceSubmit({ title: title, link: link });
    setTitle("");
    setlink("");
  }

  return (
    <PopupWithForm
      name="add"
      title="New place"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Create"
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fieldset">
        <input
          className="form__input"
          type="text"
          id="title-input"
          placeholder="Title"
          name="title"
          value={title}
          onChange={onTitleChange}
        />
        <span className="form__input-error title-input-error"></span>
        <input
          className="form__input"
          type="url"
          id="imagelink-input"
          placeholder="Image link"
          name="image"
          value={link}
          onChange={onLinkChange}
        />
        <span className="form__input-error imagelink-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}
