import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { store } from "../contexts/store";
import { Select, MenuItem, InputLabel } from "@material-ui/core";

const Container = styled.div`
  > div {
    width: 100%;
    max-width: 10em;
  }
`;

function SortArticles() {
  const globalState = useContext(store);
  const {
    state: { articles },
    dispatch,
  } = globalState;
  const [sort, setSort] = useState("");

  // sort by latest on mount
  useEffect(() => {
    setSort("latest");
    const newArticles = articles.sort((a, b) => {
      return b.datePublished - a.datePublished;
    });
    dispatch({ type: "SORT_ARTICLES", payload: { articles: newArticles } });
  }, [dispatch, articles]);

  function sortArticles(sortBy) {
    if (sortBy === "popularity") {
      const newArticles = articles.sort(
        (a, b) => b.likedBy.length - a.likedBy.length
      );
      return newArticles;
    } else if (sortBy === "latest") {
      const newArticles = articles.sort((a, b) => {
        return b.datePublished - a.datePublished;
      });
      return newArticles;
    } else if (sortBy === "title") {
      const newArticles = articles.sort((a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
      return newArticles;
    }
  }

  function handleSort(event) {
    const { value } = event.target;
    setSort(value);
    const newArticles = sortArticles(value);
    dispatch({ type: "SORT_ARTICLES", payload: { articles: newArticles } });
  }

  return (
    <Container>
      <InputLabel id="sort">Sort by</InputLabel>
      <Select labelId="sort" value={sort} onChange={handleSort} label="Sort">
        <MenuItem value="popularity">Popularity</MenuItem>
        <MenuItem value="latest">Latest</MenuItem>
        <MenuItem value="title">Title</MenuItem>
      </Select>
    </Container>
  );
}

export default SortArticles;
