import React, { useContext } from "react";
import { store } from "../../contexts/store";
import { Button } from "@material-ui/core";

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
    <header>
      {currentUser && (
        <Button variant="contained" color="default" onClick={handleLogout}>
          Logout
        </Button>
      )}
    </header>
  );
}

export default Header;
