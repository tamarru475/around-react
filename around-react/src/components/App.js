import Header from "./header";
import Main from "./main";
import Footer from "./footer";
import React from "react";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

  React.useEffect(() => {
    function onEditAvatarClick() {
      setEditAvatarPopupOpen(true);
    }

    function onEditProfileClick() {
      setEditProfilePopupOpen(true);
    }

    function onAddPlaceClick() {
      setAddPlacePopupOpen(true);
    }

    function onCardClick() {}
  });

  return (
    <div className="App">
      <div className="page">
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default App;
