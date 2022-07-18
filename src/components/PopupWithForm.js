import React from "react";
export default function PopupWithForm(props) {
  const fadeIn = `${props.isOpen ? "popup_fadein" : ""}`;

  return (
    <section
      className={`${props.name} popup ${fadeIn}`}
      id={`${props.name}-popup`}
    >
      <div className={`${props.name}__container container`}>
        <button
          type="button"
          className={`${props.name}__close-button close-button`}
          onClick={props.onClose}
        ></button>
        <div className={`${props.name}__form-container`}>
          <h2 className={`${props.name}__header`}>{props.title}</h2>
          <form className={`${props.name}__form form`} name={`${props.name}`}>
            {props.children}
          </form>
        </div>
      </div>
    </section>
  );
}
