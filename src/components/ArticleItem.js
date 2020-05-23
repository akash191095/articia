import React from "react";
import styled from "styled-components";

const Article = styled.article`
  > div:nth-of-type(1) {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
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
  return (
    <Article>
      <h3>{title}</h3>
      <div>
        <p>By {author}</p>
        <p>On: {date.toLocaleString()}</p>
      </div>
      {body}
      <div>
        {imageUrl}
        <br />
        {videoUrl}
      </div>
      {description}
    </Article>
  );
}

export default ArticleItem;
