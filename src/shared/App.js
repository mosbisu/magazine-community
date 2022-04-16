import { Route } from "react-router-dom";
import { Grid } from "../elements";
import Login from "../pages/Login";
import PostList from "../pages/PostList";
import Signup from "../pages/Signup";
import "./App.css";
import Header from "./Header";
import styled from "styled-components";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { apiKey } from "./firebase";

function App() {
  const dispatch = useDispatch();

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isSession = sessionStorage.getItem(_session_key) ? true : false;

  useEffect(() => {
    if (isSession) {
      dispatch(userActions.loginCheckFB());
    }
  }, [isSession, dispatch]);

  return (
    <AppWrap>
      <Container>
        <Grid>
          <Header />
          <ConnectedRouter history={history}>
            <Route exact path="/">
              {<PostList />}
            </Route>
            <Route exact path="/login">
              {<Login />}
            </Route>
            <Route exact path="/signup">
              {<Signup />}
            </Route>
          </ConnectedRouter>
        </Grid>
      </Container>
    </AppWrap>
  );
}

const AppWrap = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 50vw;
  height: 80vh;
  max-width: 400px;
  margin: auto;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow-y: auto;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
`;

export default App;
