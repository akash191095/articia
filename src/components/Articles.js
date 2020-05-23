import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

function Articles() {
  return (
    <div>
      <Link to="/article/create">
        <Button variant="contained" color="primary">
          Add Article
        </Button>
      </Link>
      <p>Hi</p>
    </div>
  );
}

export default Articles;
