import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Grid } from "../elements";
import Login from "../pages/Login";
import PostList from "../pages/PostList";
import Signup from "../pages/Signup";
import "./App.css";
import Header from "./Header";
import styled from "styled-components";

function App() {
  return (
    <AppWrap>
      <Container>
        <Grid>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route exact path="/">
                {<PostList />}
              </Route>
              <Route path="/login">{<Login />}</Route>
              <Route path="/signup">{<Signup />}</Route>
            </Switch>
          </BrowserRouter>
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
