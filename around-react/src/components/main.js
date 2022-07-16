import PopupWithForm from "./PopupWithForm";

export default function Main({}) {
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__image-container">
            <img
              src="#"
              alt="profile picture"
              className="profile__image"
              onClick={""}
            />
            <div className="profile__image-overlay"></div>
          </div>
          <div className="profile__info">
            <h1 className="profile__name" id="profile-name">
              Cousteau
            </h1>
            <button
              type="button"
              className="profile__edit-button profile-button"
              onClick={""}
            ></button>
            <p className="profile__name-discription" id="profile-job">
              Explorer
            </p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button profile-button"
          onClick={""}
        ></button>
      </section>
      <PopupWithForm
        name="avatar"
        title="Change profile picture"
        isOpen={false}
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
      <PopupWithForm name="edit" title="Edit profile" isOpen={false}>
        <fieldset className="form__fieldset">
          <input
            className="form__input form__input-name"
            type="text"
            id="name-input"
            placeholder="Name"
            name="name"
            minlength="2"
            maxlength="40"
            required
          />
          <span className="form__input-error name-input-error"></span>
          <input
            className="form__input form__input-job"
            type="text"
            id="job-input"
            placeholder="About"
            name="job"
            minlength="2"
            maxlength="200"
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
      <PopupWithForm name="add" title="New place" isOpen={false}>
        <fieldset className="form__fieldset">
          <input
            className="form__input"
            type="text"
            id="title-input"
            placeholder="Title"
            name="title"
            required
            minlength="1"
            maxlength="30"
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
      <PopupWithForm name="delete" title="Are you sure?" isOpen={false}>
        <button type="submit" className="delete__form-button button">
          Yes
        </button>
      </PopupWithForm>
      <section className="gallery">
        <ul className="gallery__container" id="gallery-container"></ul>
      </section>
    </main>
  );
}
