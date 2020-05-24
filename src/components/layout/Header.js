import React, { useContext } from "react";
import styled from "styled-components";
import { store } from "../../contexts/store";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  Link as MUILink,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

function Header({ currentUser }) {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  function handleLogout() {
    if (currentUser) {
      // logout
      dispatch({ type: "LOGOUT_USER" });
    }
  }

  return (
    <AppBar position="static">
      <Toolbar>
        {currentUser && (
          <Container>
            <MUILink component={Link} to="/">
              <Typography variant="button" color="secondary">
                Articia
              </Typography>
            </MUILink>
            <Button variant="contained" color="default" onClick={handleLogout}>
              Logout
            </Button>
          </Container>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
