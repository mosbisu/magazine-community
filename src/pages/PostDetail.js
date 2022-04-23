import React, { useEffect } from "react";
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import Permit from "../shared/Permit";

const PostDetail = () => {
  const { postNo } = useParams();
  console.log(postNo);
  const dispatch = useDispatch();

  // const userInfo = useSelector((state) => state.user.user);
  const postList = useSelector((store) => store.post.list);
  const post = postList.find((p) => p.postNo == postNo);

  // useEffect(() => {
  //   if (post) {
  //     return;
  //   }
  //   dispatch(postActions.getOnePostFB(id));
  // }, [id, post, dispatch]);

  useEffect(() => {
    dispatch(postActions.getPostDB(postNo));
  }, [dispatch, postNo]);

  return (
    <React.Fragment>
      {post && (
        <Post
          {...post}
          isEdit={true}
          // isMe={post.userInfo.userID === userInfo?.uid}
        />
      )}
      <Permit>
        <CommentWrite postID={postNo} />
      </Permit>
      <CommentList postID={postNo} />
    </React.Fragment>
  );
};

export default PostDetail;
