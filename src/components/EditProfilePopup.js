import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      name="edit"
      title="Edit profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Save"
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fieldset">
        <input
          className="form__input form__input-name"
          type="text"
          id="name-input"
          placeholder="Name"
          name="name"
          defaultValue={name}
          onChange={onNameChange}
        />
        <span className="form__input-error name-input-error"></span>
        <input
          className="form__input form__input-job"
          type="text"
          id="job-input"
          placeholder="About"
          name="job"
          defaultValue={description}
          onChange={onDescriptionChange}
        />
        <span className="form__input-error job-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}
