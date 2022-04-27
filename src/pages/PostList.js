import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import { Button, Grid } from "../elements";
import { actionCreators as postActions } from "../redux/modules/post";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../shared/Cookie";

const PostList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const postList = useSelector((state) => state.post.list);
  const isLogin = getCookie("isLogin");

  useEffect(() => {
    dispatch(postActions.getPostDB());
  }, [dispatch]);

  return (
    <React.Fragment>
      {postList.map((p, idx) => {
        return (
          <Grid
            key={p.postNo}
            _onClick={() => {
              navigate(`/post/${p.postNo}`);
            }}
          >
            <Post {...p} />
          </Grid>
        );
      })}
      {isLogin && (
        <Button
          isFloat
          _onClick={() => {
            navigate("/write");
          }}
        >
          +
        </Button>
      )}
    </React.Fragment>
  );
};

export default PostList;
