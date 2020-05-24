import React, { useContext } from "react";
import { store } from "../contexts/store";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./layout/theme";

import Login from "./Login";
import Articles from "./Articles";
import Header from "./layout/Header";
import CreateArticle from "./CreateArticle";

function App() {
  const globalState = useContext(store);
  const {
    state: {
      user: { username },
    },
  } = globalState;

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div>
          <CssBaseline />
          <Header currentUser={username} />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            {username ? (
              <>
                <Route path="/" exact>
                  <Articles />
                </Route>
                <Route path="/article/create">
                  <CreateArticle />
                </Route>
              </>
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                }}
              />
            )}
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
