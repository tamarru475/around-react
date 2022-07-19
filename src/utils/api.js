import React from "react";

const customFetch = (url, header) =>
  fetch(url, header).then((res) =>
    res.ok ? res.json() : Promise.reject(`Something went wrong: ${res.status}`)
  );

class Api extends React.Component {
  constructor({ baseUrl, headers }, props) {
    super(props);

    this._baseUrl = baseUrl;
    this._headers = headers;

    this.state = {
      likes: 0,
    };
  }

  getUserInfo() {
    return customFetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  getInitialCards() {
    return customFetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "6a85a377-e76e-4e72-85a9-79ee5208e36a",
    "Content-Type": "application/json",
  },
});

export { api };
