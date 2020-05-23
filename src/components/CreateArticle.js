import React, { useContext, useState } from "react";
import styled from "styled-components";
import validator from "validator";
import urlParser from "js-video-url-parser";
import { v4 as uuidv4 } from "uuid";
import { store } from "../contexts/store";
import { TextField, Button } from "@material-ui/core";
import { useInput } from "../hooks/useInput";
import { useHistory } from "react-router-dom";

const Container = styled.section`
  margin: 1em;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 2em;
    > * {
      margin-bottom: 2em;
    }
  }
`;

function CreateArticle() {
  let articleId;
  // const articleId = "2b3d5dc1-8112-4bb7-bf7a-dffe6559461b";

  const { value: title, bind: bindTitle, setError: setErrorTitle } = useInput(
    ""
  );
  const {
    value: videoUrl,
    bind: bindVideoUrl,
    setError: setErrorVideoUrl,
  } = useInput("");
  const {
    value: imageUrl,
    bind: bindImageUrl,
    setError: setErrorImageUrl,
  } = useInput("");
  const {
    value: description,
    bind: bindDescription,
    setError: setErrorDescription,
  } = useInput("");
  const { value: body, bind: bindBody, setError: setErrorBody } = useInput("");
  const [hasError, setHasError] = useState(false);
  const globalState = useContext(store);
  const {
    state: {
      articles,
      user: { username },
    },
    dispatch,
  } = globalState;

  let history = useHistory();

  function validateData() {
    let passedValidation = true;

    // Title
    if (validator.isEmpty(title)) {
      setErrorTitle("Title can't be empty");
      passedValidation = false;
    } else {
      setErrorTitle("");
    }

    // Video Url
    const videoUrlData = urlParser.parse(videoUrl);
    if (
      !validator.isEmpty(videoUrl) &&
      (!videoUrlData || videoUrlData.provider !== "youtube")
    ) {
      setErrorVideoUrl("Please check the youtube video url");
      passedValidation = false;
    } else {
      setErrorVideoUrl("");
    }

    // Image Url
    if (!validator.isEmpty(imageUrl) && !validator.isURL(imageUrl)) {
      setErrorImageUrl("Please check image url");
    } else {
      setErrorImageUrl("");
    }

    // Description
    if (validator.isEmpty(description)) {
      setErrorDescription("Description can't be empty");
      passedValidation = false;
    } else {
      setErrorDescription("");
    }

    // Body
    if (validator.isEmpty(body)) {
      setErrorBody("Body can't be empty");
      passedValidation = false;
    } else {
      setErrorBody("");
    }

    return passedValidation;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validateData()) return setHasError(true);
    let newArticles = [];

    if (articleId) {
      // editing an existing article
      const newArticleData = {
        id: articleId,
        title,
        videoUrl,
        imageUrl,
        description,
        body,
        datePublished: new Date().getTime(),
        author: username,
      };
      newArticles = articles.map((article) => {
        if (article.id === articleId) {
          return newArticleData;
        } else {
          return article;
        }
      });
    } else {
      // adding new article
      const newArticle = {
        id: uuidv4(),
        title,
        videoUrl,
        imageUrl,
        description,
        body,
        datePublished: new Date().getTime(),
        author: username,
      };
      newArticles = [...articles, newArticle];
    }
    dispatch({ type: "ADD_ARTICLE", payload: { articles: newArticles } });
    history.push("/");
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          variant="outlined"
          label="Title"
          {...bindTitle}
        />
        <TextField
          type="text"
          variant="outlined"
          label="Video Url"
          {...bindVideoUrl}
        />
        <TextField
          type="text"
          variant="outlined"
          label="Image Url"
          {...bindImageUrl}
        />
        <TextField
          type="text"
          variant="outlined"
          placeholder="Description"
          multiline
          {...bindDescription}
        />
        <TextField
          type="text"
          variant="outlined"
          placeholder="Body"
          multiline
          {...bindBody}
        />

        <Button type="submit" variant="contained">
          Add Article
        </Button>
      </form>
    </Container>
  );
}

export default CreateArticle;
