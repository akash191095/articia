import React, { useContext } from "react";
import { store } from "../contexts/store";
import { Typography, Link as MUILink, Button } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import { Link } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";

const Likes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;

  span {
    color: ${(props) => (props.likes ? "red" : "inherit")};
    cursor: pointer;
  }
  p {
    margin-left: auto;
    margin-top: -4px;
  }
`;

const EditContainer = styled.div`
  margin-top: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Video = styled.div`
  margin: 2em;
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */

  > iframe {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
`;

const Image = styled.div`
  margin: 2em 0;
  img {
    object-fit: cover;
    width: 100%;
    height: 16em;
  }
`;

const Article = styled.article`
  background-color: ${(props) => props.color};
  padding: 1em;
  margin: 0.5em 0;
  border-radius: 10px;

  display: flex;
  align-items: center;
  flex-direction: column;
  h3:nth-of-type(1) {
    margin-left: auto;
  }
  p {
    margin-right: auto;
  }
`;

function ArticleItem({
  article: {
    title,
    author,
    datePublished,
    body,
    description,
    imageUrl,
    videoUrl,
    id,
    likedBy,
  },
  currentUser: { username: currentUser },
}) {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const date = new Date(datePublished);
  const theme = useTheme();

  function handleLike() {
    if (likedBy.includes(currentUser)) {
      dispatch({
        type: "ARTICLE_DISLIKE",
        payload: { articleId: id, currentUser },
      });
    } else {
      dispatch({
        type: "ARTICLE_LIKE",
        payload: { articleId: id, currentUser },
      });
    }
  }

  return (
    <Article color={theme.palette.secondary.light}>
      <Typography variant="h5" component="h3">
        {title}
      </Typography>
      <Typography variant="body1" component="p">
        {body}
      </Typography>
      <Typography variant="caption" component="p">
        {author}: {description}
      </Typography>
      <Typography variant="caption" component="p">
        On: {date.toLocaleString()}
      </Typography>
      {imageUrl && (
        <Image>
          <Typography variant="caption" component="p">
            Image
          </Typography>
          <img src={imageUrl} alt="post" />
        </Image>
      )}
      {videoUrl && (
        <Video>
          <iframe
            title={title}
            width="560"
            height="315"
            src={videoUrl}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            frameBorder="0"
          ></iframe>
        </Video>
      )}
      <EditContainer>
        <Likes likes={likedBy.includes(currentUser)}>
          <span onClick={handleLike}>
            <FavoriteIcon />
          </span>
          <Typography>{likedBy.length} Likes</Typography>
        </Likes>
        {author === currentUser && (
          <MUILink
            component={Link}
            variant="button"
            to={{
              pathname: `/article/create/`,
              state: {
                articleId: id,
              },
            }}
          >
            <Button variant="outlined" size="small">
              Edit
            </Button>
          </MUILink>
        )}
      </EditContainer>
    </Article>
  );
}

export default ArticleItem;
