import React from "react";

export default function Card(props) {
  function handleImageClick() {
    props.onCardClick(props.card);
  }

  function handleTrashClick() {
    props.onTrashClick();
  }

  return (
    <>
      <li className="gallery__card">
        <div
          className="gallery__card-image"
          style={{ backgroundImage: `url(${props.card.link})` }}
          onClick={handleImageClick}
        ></div>
        <button
          type="button"
          className="gallery__card-trash-button gallery__card-trash-button_active"
          onClick={handleTrashClick}
        ></button>
        <div className="gallery__card-footer">
          <h2 className="gallery__card-place">{props.card.name}</h2>
          <div className="gallery__card-like">
            <button
              type="button"
              className="gallery__card-like_button"
            ></button>
            <div className="gallery__card-like_counter">
              {props.card.likes.length}
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
