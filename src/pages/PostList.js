import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import { Button, Grid } from "../elements";
import { actionCreators as postActions } from "../redux/modules/post";
import InfinityScroll from "../shared/InfinityScroll";
import Permit from "../shared/Permit";
import { useNavigate } from "react-router-dom";

const PostList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post_list = useSelector((state) => state.post.list);
  // const postList = useSelector((state) => state.post.list);
  // const userInfo = useSelector((state) => state.user.user);
  // const isLoading = useSelector((state) => state.post.isLoading);
  // const paging = useSelector((state) => state.post.paging);

  const [Layout1, setLayout1] = useState(true);
  const [Layout2, setLayout2] = useState(false);
  const [Layout3, setLayout3] = useState(false);

  const onLayout1 = () => {
    setLayout1(true);
    setLayout2(false);
    setLayout3(false);
  };

  const onLayout2 = () => {
    setLayout1(false);
    setLayout2(true);
    setLayout3(false);
  };

  const onLayout3 = () => {
    setLayout1(false);
    setLayout2(false);
    setLayout3(true);
  };

  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   axios({
  //     method: "GET",
  //     url: "https://b05d2ec3-e91a-4a49-9526-a73171a613d3.mock.pstmn.io/api/get",
  //   }).then(function (response) {
  //     console.log(response);
  //     setPosts(response.data);
  //   });
  // }, []);

  useEffect(() => {
    dispatch(postActions.getPostDB());
  }, [dispatch]);

  // useEffect(() => {
  //   if (postList.length < 2) {
  //     dispatch(postActions.getPostFB());
  //   }
  // }, [dispatch, postList.length]);

  return (
    <React.Fragment>
      <Grid isFlex>
        <Button _onClick={onLayout1}>1</Button>
        <Button _onClick={onLayout2}>2</Button>
        <Button _onClick={onLayout3}>3</Button>
      </Grid>
      <InfinityScroll
      // callNext={() => {
      //   dispatch(postActions.getPostFB(paging.next));
      // }}
      // isNext={paging.next ? true : false}
      // loading={isLoading}
      >
        {post_list.map((p, idx) => {
          return (
            <Grid
              key={p.postNo}
              _onClick={() => {
                navigate(`/post/${p.postNo}`);
              }}
            >
              <Post
                {...p}
                Layout1={Layout1}
                Layout2={Layout2}
                Layout3={Layout3}
              />
            </Grid>
          );
        })}
      </InfinityScroll>
      <Permit>
        <Button
          isFloat
          _onClick={() => {
            navigate("/write");
          }}
        >
          +
        </Button>
      </Permit>
    </React.Fragment>
  );
};

export default PostList;
