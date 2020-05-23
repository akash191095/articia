import React, { useContext, useEffect } from "react";
import { store } from "../contexts/store";
import userList from "../users.json";
import { useInput } from "../hooks/useInput";
import { TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

function Login() {
  const [currentUser] = useLocalStorage("user", null);
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const { value: username, bind: bindUsername } = useInput("");
  const { value: password, bind: bindPassword } = useInput("");
  let history = useHistory();

  // auto login on mount
  useEffect(() => {
    if (currentUser) {
      dispatch({ type: "LOGIN_USER", payload: { username: currentUser } });
      history.push("/");
    }
  }, [currentUser, dispatch, history]);

  function handleLogin(event) {
    event.preventDefault();
    const user = userList[username];
    if (user && user.password === password) {
      // user authenticated
      dispatch({ type: "LOGIN_USER", payload: { username: user.username } });
      history.push("/");
    } else {
      // handle wrong password
    }
  }

  return (
    <form>
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
      <Button type="submit" onClick={handleLogin}>
        Login
      </Button>
    </form>
  );
}

export default Login;
