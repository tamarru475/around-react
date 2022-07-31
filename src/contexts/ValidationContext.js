import React from "react";

export const ValidationContext = React.createContext();

export const errorMessages = {
  emptyField: "Please fill out this field.",
  toShort:
    "Please lengthen this text to 2 characters or more (you are currently using 1 character)",
  notUrl: "Please enter a URL.",
};

export const errorClasses = {
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};
