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
  const [articles, saveArticles] = useLocalStorage("articles", []);
  const [, saveUser] = useLocalStorage("user", null);

  const [state, dispatch] = useReducer(rootReducer, initialState);
  const store = React.useMemo(() => ({ state, dispatch }), [state]);

  function rootReducer(state, action) {
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
      case "SORT_ARTICLES": {
        const { articles } = payload;
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
  }

  // load on mount
  useEffect(() => {
    dispatch({ type: "ADD_ARTICLE", payload: { articles } });
  }, [articles]);

  return <Provider value={store}>{children}</Provider>;
};

export { store, StateProvider };
