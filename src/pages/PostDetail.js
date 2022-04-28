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

  useEffect(() => {
    dispatch(postActions.getOnePostDB(postNo, post));
  }, [dispatch, postNo, post]);

  return (
    <React.Fragment>{post && <Post {...post} isEdit={true} />}</React.Fragment>
  );
};

export default PostDetail;
