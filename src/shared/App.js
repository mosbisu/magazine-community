import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Grid } from "../elements";
import Login from "../pages/Login";
import PostList from "../pages/PostList";
import Signup from "../pages/Signup";
import "./App.css";
import Header from "../components/Header";
import styled from "styled-components";
import PostWrite from "../pages/PostWrite";
import PostDetail from "../pages/PostDetail";

function App() {
  return (
    <AppWrap>
      <Grid height="100%">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/write" element={<PostWrite />} />
            <Route path="/write/:postNo" element={<PostWrite />} />
            <Route path="/post/:postNo" element={<PostDetail />} />
          </Routes>
        </BrowserRouter>
      </Grid>
    </AppWrap>
  );
}

const AppWrap = styled.div`
  background-color: rgb(239, 246, 255);
  height: 100%;
  width: 100%;
  max-width: 400px;

  @media screen and (min-width: 480px) {
    width: 50vw;
    margin: auto;
    border: 1px solid #ddd;
    border-top: none;
  }
`;

export default App;
