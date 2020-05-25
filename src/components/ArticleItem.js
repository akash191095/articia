import React, { useContext } from "react";
import moment from "moment";
import { store } from "../contexts/store";
import { Typography, Link as MUILink, Button } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import { Link } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";

const Avatar = styled.div`
  width: 80px;
  text-align: center;
  margin-top: 2em;
  img {
    display: block;
    width: 80px;
    border-radius: 10px;
    margin: 0.5em 0;
  }
`;

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
  margin-top: auto;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  align-items: flex-end;
  width: 100%;

  > div {
    margin-right: 1em;
  }
`;

const Video = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */

  grid-column-start: 1;
  grid-column-end: 3;

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
  grid-column-start: 1;
  grid-column-end: 3;
  img {
    object-fit: cover;
    width: 100%;
    height: 16em;
  }
`;

const Article = styled.article`
  background-color: ${(props) => props.color};
  padding: 1em;
  margin: 3em 0;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.4fr 0fr 3fr 0.8fr;
  .article--item__title {
    grid-column-start: 1;
    grid-column-end: 3;
  }
  .article--item__date {
    margin-bottom: 0.5em;
    grid-column-start: 1;
    grid-column-end: 3;
  }
  .article--item__body {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 3;
    grid-row-end: 4;
  }
  .article--item__note {
    margin-top: auto;
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 4;
    grid-row-end: 5;
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
      <Typography variant="h5" component="h3" className="article--item__title">
        {title}
      </Typography>
      <Typography
        variant="caption"
        component="p"
        className="article--item__date"
      >
        {moment(date).calendar()}
      </Typography>
      <Typography variant="body1" component="p" className="article--item__body">
        {body}
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
        <>
          <Typography variant="caption" component="p">
            Video
          </Typography>
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
        </>
      )}
      <Typography
        variant="caption"
        component="p"
        className="article--item__note"
      >
        Note: {description}
      </Typography>
      <Avatar>
        <img src="https://picsum.photos/200" alt="avatar" />
        <Typography variant="body2" component="p">
          {author}
        </Typography>
      </Avatar>
      <EditContainer>
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
        <Likes likes={likedBy.includes(currentUser)}>
          <span onClick={handleLike}>
            <FavoriteIcon />
          </span>
          <Typography>
            {likedBy.length} {likedBy.length > 1 ? "Likes" : "Like"}
          </Typography>
        </Likes>
      </EditContainer>
    </Article>
  );
}

export default ArticleItem;
