import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import { actionCreators as postActions } from "../redux/modules/post";

const PostList = () => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.list);
  console.log(postList);

  useEffect(() => {
    if (postList.length === 0) {
      dispatch(postActions.getPostFB());
    }
  }, [dispatch, postList.length]);

  return (
    <React.Fragment>
      {postList.map((p, idx) => {
        return <Post key={p.id} {...p} />;
      })}
    </React.Fragment>
  );
};

export default PostList;
