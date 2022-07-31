import React from "react";
import PopupWithForm from "./PopupWithForm";
import ValidationContext from "../contexts/ValidationContext";

export default function AddPlacePopup(props) {
  const [title, setTitle] = React.useState("");
  const [link, setlink] = React.useState("");
  const errorMessages = React.useContext(ValidationContext);
  const [titleError, setTitleError] = React.useState("");
  const [linkError, setLinkError] = React.useState("");

  const showErrorMessage = `${props.isValid ? "" : "form__input-error_active"}`;

  const showErrorInput = `${props.isValid ? "" : "form__input_type_error"}`;
  const [disableButton, setDisableButton] = React.useState(true);
  const disabledButtonClass = `${
    !disableButton ? "" : "form__button_disabled"
  }`;

  const onTitleChange = (e) => {
    setTitle(e.target.value);
    if (e.target.value.length === 0) {
      setTitleError(`${errorMessages.emptyField}`);
      props.setValid(false);
      setDisableButton(true);
    } else if (e.target.value.length < 2) {
      setTitleError(`${errorMessages.toShort}`);
      props.setValid(false);
      setDisableButton(true);
    } else {
      setTitleError("");
      props.setValid(true);
      setDisableButton(false);
    }
  };

  const onLinkChange = (e) => {
    setlink(e.target.value);
    const regExQ =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    if (!e.target.value.match(regExQ)) {
      setLinkError(`${errorMessages.notUrl}`);
      props.setValid(false);
      setDisableButton(true);
    } else {
      setTitleError("");
      props.setValid(true);
      setDisableButton(false);
    }
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
      disabledButtonClass={disabledButtonClass}
      disableButton={disableButton}
    >
      <fieldset className="form__fieldset">
        <input
          className={`form__input ${showErrorInput}`}
          type="text"
          id="title-input"
          placeholder="Title"
          name="title"
          value={title}
          onChange={onTitleChange}
        />
        <span
          className={`form__input-error title-input-error ${showErrorMessage}`}
        >
          {titleError}
        </span>
        <input
          className={`form__input ${showErrorInput}`}
          type="url"
          id="imagelink-input"
          placeholder="Image link"
          name="image"
          value={link}
          onChange={onLinkChange}
        />
        <span
          className={`form__input-error imagelink-input-error ${showErrorMessage}`}
        >
          {linkError}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}
