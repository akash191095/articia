import React, { useContext } from "react";
import { store } from "../contexts/store";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import ArticleItem from "./ArticleItem";

function Articles() {
  const globalState = useContext(store);
  const {
    state: { articles },
  } = globalState;

  return (
    <div>
      <Link to="/article/create">
        <Button variant="contained" color="primary">
          Add Article
        </Button>
      </Link>
      {articles.map((article) => (
        <ArticleItem key={article.id} article={article} />
      ))}
    </div>
  );
}

export default Articles;
