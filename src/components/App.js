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

  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          username ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }

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
            <PrivateRoute path="/" exact>
              <Articles />
            </PrivateRoute>
            <PrivateRoute path="/article/create" exact>
              <CreateArticle />
            </PrivateRoute>
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
