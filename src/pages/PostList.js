import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import { actionCreators as postActions } from "../redux/modules/post";

const PostList = () => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.list);
  const userInfo = useSelector((state) => state.user.user);

  useEffect(() => {
    if (postList.length === 0) {
      dispatch(postActions.getPostFB());
    }
  }, [dispatch, postList.length]);

  return (
    <React.Fragment>
      {postList.map((p, idx) => {
        if (p.userInfo.userID === userInfo?.uid) {
          return <Post key={p.id} {...p} idx={idx} isMe />;
        } else {
          return <Post key={p.id} {...p} idx={idx} />;
        }
      })}
    </React.Fragment>
  );
};

export default PostList;
