import React, { useEffect } from "react";
import Post from "../components/Post";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const PostDetail = () => {
  const { postNo } = useParams();
  const dispatch = useDispatch();

  const postList = useSelector((store) => store.post.list);
  const post = postList.find((p) => p.postNo == postNo);

  // useEffect(() => {
  //   if (post) {
  //     return;
  //   }
  //   dispatch(postActions.getOnePostFB(id));
  // }, [id, post, dispatch]);

  useEffect(() => {
    dispatch(postActions.getOnePostDB(postNo, post));
  }, [dispatch, postNo, post]);

  return (
    <React.Fragment>
      {post && (
        <Post
          {...post}
          isEdit={true}
          // isMe={post.userInfo.userID === userInfo?.uid}
        />
      )}
    </React.Fragment>
  );
};

export default PostDetail;
