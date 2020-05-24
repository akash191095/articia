import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { store } from "../contexts/store";
import userList from "../users.json";
import { useInput } from "../hooks/useInput";
import { TextField, Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

const LoginContainer = styled.section`
  text-align: center;
  h1 {
    margin-top: 2em;
    font-size: 3em;
  }
  > form {
    max-width: 30em;
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;

    /* margin: 1em; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    > div {
      margin: 1em;
      margin-top: 0;
    }
    > button {
      margin: 2em;
      align-self: center;
      width: 9em;
    }
    > p {
      height: 50px;
      color: red;
      margin: 0;
    }
  }

  @media (min-width: 1200px) {
    font-size: 1.5em;
  }

  @media (min-width: 1920px) {
    h1 {
      margin-top: 3em;
    }
    form {
      top: 60%;
    }
  }
`;

function Login() {
  const [currentUser] = useLocalStorage("user", null);
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const { value: username, bind: bindUsername } = useInput("");
  const { value: password, bind: bindPassword } = useInput("");
  const [hasError, setHasError] = useState(false);
  let history = useHistory();

  // auto login on mount
  useEffect(() => {
    if (currentUser) {
      dispatch({ type: "LOGIN_USER", payload: { username: currentUser } });
      history.push("/");
    }
  }, [currentUser, dispatch, history]);

  useEffect(() => {
    setHasError(false);
  }, [username, password]);

  function handleLogin(event) {
    event.preventDefault();
    const user = userList[username];
    if (user && user.password === password) {
      // user authenticated
      dispatch({ type: "LOGIN_USER", payload: { username: user.username } });
      history.push("/");
    } else {
      // handle wrong password
      setHasError(true);
    }
  }

  return (
    <LoginContainer>
      <Typography variant="h1" component="h1">
        Articia
      </Typography>
      <form>
        {hasError ? (
          <Typography
            variant="caption"
            component="p"
            style={{ height: "50px" }}
          >
            Please Try Again
          </Typography>
        ) : (
          <p></p>
        )}
        <TextField
          label="Username"
          type="text"
          variant="outlined"
          {...bindUsername}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          {...bindPassword}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleLogin}
        >
          Login
        </Button>
      </form>
    </LoginContainer>
  );
}

export default Login;
