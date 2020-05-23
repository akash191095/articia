import React, { createContext, useReducer } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const initialState = {
  user: {
    username: null,
  },
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [, saveUser] = useLocalStorage("user", null);

  const [state, dispatch] = useReducer((state, action) => {
    const { type, payload } = action;
    switch (type) {
      case "LOGIN_USER":
        const { username } = payload;
        saveUser(username);
        return { ...state, user: { username } };
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
