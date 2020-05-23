import React from "react";
import { Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import styled from "styled-components";

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
  },
}) {
  const date = new Date(datePublished * 1000);
  const theme = useTheme();

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
    </Article>
  );
}

export default ArticleItem;
