import React, { useContext } from "react";
import styled from "styled-components";
import { store } from "../contexts/store";
// import { useLocalStorage } from "../hooks/useLocalStorage";
import { TextField, Button } from "@material-ui/core";
import { useInput } from "../hooks/useInput";
import { useHistory } from "react-router-dom";

const Container = styled.section`
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    alignitems: center;
    margin-top: 2em;
    > * {
      margin-bottom: 2em;
    }
  }
`;

function CreateArticle() {
  const { value: title, bind: bindTitle } = useInput("");
  const { value: videoUrl, bind: bindVideoUrl } = useInput("");
  const { value: imageUrl, bind: bindImageUrl } = useInput("");
  const { value: description, bind: bindDescription } = useInput("");
  const { value: body, bind: bindBody } = useInput("");
  const globalState = useContext(store);
  const {
    state: {
      articles,
      user: { username },
    },
    dispatch,
  } = globalState;

  let history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    const newArticle = {
      title,
      videoUrl,
      imageUrl,
      description,
      body,
      datePublised: new Date().getTime(),
      author: username,
    };

    const newArticles = [...articles, newArticle];

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
