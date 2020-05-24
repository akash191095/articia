import React, { createContext, useReducer, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const initialState = {
  user: {
    username: null,
  },
  articles: [],
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [, saveUser] = useLocalStorage("user", null);
  const [articles, saveArticles] = useLocalStorage("articles", []);

  const [state, dispatch] = useReducer((state, action) => {
    const { type, payload } = action;
    switch (type) {
      case "LOGIN_USER": {
        const { username } = payload;
        saveUser(username);
        return { ...state, user: { username } };
      }
      case "LOGOUT_USER": {
        saveUser(null);
        return { ...state, user: { username: null } };
      }
      case "ADD_ARTICLE": {
        const { articles } = payload;
        saveArticles(articles);
        return { ...state, articles };
      }
      case "ARTICLE_LIKE": {
        const { articleId, currentUser } = payload;
        const newArticles = articles.map((article) => {
          if (
            article.id === articleId &&
            !article.likedBy.includes(currentUser)
          ) {
            const newLikedBy = [...article.likedBy, currentUser];
            return { ...article, likedBy: newLikedBy };
          } else {
            return article;
          }
        });
        saveArticles(newArticles);
        return { ...state, articles: newArticles };
      }
      case "ARTICLE_DISLIKE": {
        const { articleId, currentUser } = payload;
        const newArticles = articles.map((article) => {
          if (
            article.id === articleId &&
            article.likedBy.includes(currentUser)
          ) {
            const newLikedBy = article.likedBy.filter(
              (user) => user !== currentUser
            );
            return { ...article, likedBy: newLikedBy };
          } else {
            return article;
          }
        });
        saveArticles(newArticles);
        return { ...state, articles: newArticles };
      }
      default:
        return state;
    }
  }, initialState);

  useEffect(() => {
    dispatch({ type: "ADD_ARTICLE", payload: { articles } });
  }, [articles]);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
