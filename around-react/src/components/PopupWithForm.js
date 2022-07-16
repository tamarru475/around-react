export default function PopupWithForm(props) {
  function handleClosePopup() {
    document.querySelector(`.${props.name}`).classList.remove("popup_fadein");
  }

  return (
    <section
      className={`${props.name} popup ${props.isOpen ? "popup_fadein" : ""}`}
      id={`${props.name}-popup`}
    >
      <div className={`${props.name}__container container`}>
        <button
          type="button"
          className={`${props.name}__close-button close-button`}
          onClick={handleClosePopup}
        ></button>
        <div className={`${props.name}__form-container`}>
          <h2 className={`${props.name}__header`}>{props.title}</h2>
          <form
            className={`${props.name}__form form`}
            name={`${props.name}`}
            nolvalidate
          >
            {props.children}
          </form>
        </div>
      </div>
    </section>
  );
}
