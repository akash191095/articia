import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import validator from "validator";
import urlParser from "js-video-url-parser";
import { v4 as uuidv4 } from "uuid";
import { store } from "../contexts/store";
import { TextField, Button, Typography } from "@material-ui/core";
import { useInput } from "../hooks/useInput";
import { useHistory, useLocation } from "react-router-dom";

const Container = styled.section`
  margin: 1em;
  max-width: 60em;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 2em;
    > * {
      margin-bottom: 2em;
    }
  }

  @media (min-width: 55em) {
    margin: 2em auto;
  }
`;

function CreateArticle() {
  const { state: { articleId = null } = {} } = useLocation();
  const [articleToEdit, setArticleToEdit] = useState(null);
  const {
    value: title,
    bind: bindTitle,
    setValue: setTitle,
    setError: setErrorTitle,
  } = useInput("", true);
  const {
    value: videoUrl,
    bind: bindVideoUrl,
    setValue: setVideoUrl,
    setError: setErrorVideoUrl,
  } = useInput("", true);
  const {
    value: imageUrl,
    bind: bindImageUrl,
    setValue: setImageUrl,
    setError: setErrorImageUrl,
  } = useInput("", true);
  const {
    value: description,
    bind: bindDescription,
    setValue: setDescription,
    setError: setErrorDescription,
  } = useInput("", true);
  const {
    value: body,
    bind: bindBody,
    setValue: setBody,
    setError: setErrorBody,
  } = useInput("", true);
  const globalState = useContext(store);
  const {
    state: {
      articles,
      user: { username },
    },
    dispatch,
  } = globalState;

  let history = useHistory();

  // initilize data for edit
  useEffect(() => {
    if (articleId) {
      const article = articles.find((article) => article.id === articleId);
      setArticleToEdit(article);
      const { title, body, description, imageUrl, videoUrl } = article;
      setTitle(title);
      setBody(body);
      setDescription(description);
      setImageUrl(imageUrl);
      setVideoUrl(videoUrl);
    }
  }, [
    articleId,
    setVideoUrl,
    setImageUrl,
    setTitle,
    setDescription,
    setBody,
    articles,
  ]);

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
    } else if (!validator.isEmpty(videoUrl) && !videoUrl.includes("embed")) {
      setErrorVideoUrl("please enter the embed youtube link");
    } else {
      setErrorVideoUrl("");
    }

    // Image Url
    if (!validator.isEmpty(imageUrl) && !validator.isURL(imageUrl)) {
      passedValidation = false;
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
    if (!validateData()) return;
    let newArticles = [];

    if (articleId) {
      // editing an existing article
      const newArticleData = {
        ...articleToEdit,
        title,
        videoUrl,
        imageUrl,
        description,
        body,
        datePublished: new Date().getTime(),
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
        likedBy: [username],
      };
      newArticles = [...articles, newArticle];
    }
    dispatch({ type: "ADD_ARTICLE", payload: { articles: newArticles } });
    history.push("/");
  }

  return (
    <Container>
      <Typography variant="h4" component="h3">
        {articleId ? "Edit Article" : "Add Article"}
      </Typography>
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
          label="Description"
          placeholder="Description"
          multiline
          {...bindDescription}
        />
        <TextField
          type="text"
          variant="outlined"
          label="Body"
          placeholder="Body"
          multiline
          {...bindBody}
        />

        <Button type="submit" variant="contained">
          {articleId ? "Save Changes" : "Add Article"}
        </Button>
      </form>
    </Container>
  );
}

export default CreateArticle;
