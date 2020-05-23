import React, { useContext } from "react";
import styled from "styled-components";
import { store } from "../contexts/store";
import ArticleItem from "./ArticleItem";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const Container = styled.section`
  margin: 1em;
`;

const AddArticleContainer = styled.div`
  position: sticky;
  bottom: 1rem;
  text-align: right;
`;

function Articles() {
  const globalState = useContext(store);
  const {
    state: { articles, user: username },
  } = globalState;

  return (
    <Container>
      {articles.map((article) => (
        <ArticleItem
          key={article.id}
          article={article}
          currentUser={username}
        />
      ))}
      <AddArticleContainer>
        <Link to="/article/create">
          <Button variant="contained" color="default">
            Add Article
          </Button>
        </Link>
      </AddArticleContainer>
    </Container>
  );
}

export default Articles;
