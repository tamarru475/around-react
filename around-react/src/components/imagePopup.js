export default function ImagePopup() {
  return (
    <section className="image popup" id="image-popup">
      <div className="image__container container">
        <button
          type="button"
          className="image__close-button close-button"
        ></button>
        <img className="image__popup" src="#" alt="" />
        <p className="image__discription"></p>
      </div>
    </section>
  );
}
