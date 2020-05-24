import React, { useContext } from "react";
import styled from "styled-components";
import { store } from "../contexts/store";
import ArticleItem from "./ArticleItem";
import { Link } from "react-router-dom";
import { Button, Link as MUILink } from "@material-ui/core";
import SortArticles from "./SortArticles";

const Container = styled.section`
  margin: 1em;
  padding-bottom: 3em;

  @media (min-width: 1000px) {
    margin: 4em auto;
    font-size: 1.3em;
    max-width: 60vw;
  }
`;

const AddArticleContainer = styled.div`
  position: fixed;
  bottom: 1em;
  text-align: right;
`;

function Articles() {
  const globalState = useContext(store);
  const {
    state: { articles, user: username },
  } = globalState;

  return (
    <Container>
      <SortArticles />
      {articles.map((article) => (
        <ArticleItem
          key={article.id}
          article={article}
          currentUser={username}
        />
      ))}
      <AddArticleContainer>
        <MUILink component={Link} variant="button" to="/article/create">
          <Button variant="contained" color="primary">
            Add Article
          </Button>
        </MUILink>
      </AddArticleContainer>
    </Container>
  );
}

export default Articles;
