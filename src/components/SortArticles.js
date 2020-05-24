import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { store } from "../contexts/store";
import { Select, MenuItem, InputLabel } from "@material-ui/core";
import moment from "moment";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Container = styled.div`
  margin: 2em 0;
  display: flex;
  justify-content: space-between;

  > div {
    div {
      width: 100%;
      width: 10em;
    }
  }
`;

function SortArticles() {
  const [originalArticles] = useLocalStorage("articles", []);
  const globalState = useContext(store);
  const {
    state: { articles },
    dispatch,
  } = globalState;
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");

  // sort by latest on mount
  useEffect(() => {
    setSort("latest");
    const newArticles = articles.sort((a, b) => {
      return b.datePublished - a.datePublished;
    });
    dispatch({ type: "SORT_ARTICLES", payload: { articles: newArticles } });
  }, [dispatch, articles]);

  function sortArticles(sortBy) {
    let newArticles = [];
    if (sortBy === "popularity") {
      newArticles = articles.sort(
        (a, b) => b.likedBy.length - a.likedBy.length
      );
    } else if (sortBy === "latest") {
      newArticles = articles.sort((a, b) => {
        return b.datePublished - a.datePublished;
      });
    } else if (sortBy === "title") {
      newArticles = articles.sort((a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
    }
    return newArticles;
  }

  function filterArticles(filterBy) {
    let newArticles = [];
    if (filterBy === "15mins") {
      newArticles = originalArticles.filter((article) => {
        const currentDate = moment().subtract(15, "minutes");
        const articleDate = moment(new Date(article.datePublished));
        if (articleDate.isAfter(currentDate)) {
          return true;
        } else {
          return false;
        }
      });
    } else if (filterBy === "1hour") {
      newArticles = originalArticles.filter((article) => {
        const currentDate = moment().subtract(1, "hour");
        const articleDate = moment(new Date(article.datePublished));
        if (articleDate.isAfter(currentDate)) {
          return true;
        } else {
          return false;
        }
      });
    } else if (filterBy === "24hours") {
      newArticles = originalArticles.filter((article) => {
        const currentDate = moment().subtract(24, "hours");
        const articleDate = moment(new Date(article.datePublished));
        if (articleDate.isAfter(currentDate)) {
          return true;
        } else {
          return false;
        }
      });
    }
    return newArticles;
  }

  function handleSort(event) {
    const { value } = event.target;
    setSort(value);
    const newArticles = sortArticles(value);
    dispatch({ type: "SORT_ARTICLES", payload: { articles: newArticles } });
  }

  function handleFilter(event) {
    const { value } = event.target;
    setFilter(value);
    const newArticles = filterArticles(value);
    dispatch({ type: "SORT_ARTICLES", payload: { articles: newArticles } });
  }

  return (
    <Container>
      <div>
        <InputLabel id="sort">Sort by</InputLabel>
        <Select labelId="sort" value={sort} onChange={handleSort} label="Sort">
          <MenuItem value="popularity">Popularity</MenuItem>
          <MenuItem value="latest">Latest</MenuItem>
          <MenuItem value="title">Title</MenuItem>
        </Select>
      </div>
      <div>
        <InputLabel id="filter">filter by</InputLabel>
        <Select
          labelId="filter"
          value={filter}
          onChange={handleFilter}
          label="filter"
        >
          <MenuItem value="15mins">Last 15 mins</MenuItem>
          <MenuItem value="1hour">Last 1 hour</MenuItem>
          <MenuItem value="24hours">last 24 hours</MenuItem>
        </Select>
      </div>
    </Container>
  );
}

export default SortArticles;
