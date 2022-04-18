import { history } from "../redux/configureStore";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import { Button } from "../elements";
import { actionCreators as postActions } from "../redux/modules/post";
import InfinityScroll from "../shared/InfinityScroll";
import Permit from "../shared/Permit";

const PostList = () => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.list);
  const userInfo = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.post.isLoading);
  const paging = useSelector((state) => state.post.paging);

  useEffect(() => {
    if (postList.length === 0) {
      dispatch(postActions.getPostFB());
    }
  }, [dispatch, postList.length]);

  return (
    <React.Fragment>
      <InfinityScroll
        callNext={() => {
          dispatch(postActions.getPostFB(paging.next));
        }}
        isNext={paging.next ? true : false}
        loading={isLoading}
      >
        {postList.map((p, idx) => {
          if (p.userInfo.userID === userInfo?.uid) {
            return <Post key={p.id} {...p} idx={idx} isMe />;
          } else {
            return <Post key={p.id} {...p} idx={idx} />;
          }
        })}
      </InfinityScroll>
      <Permit>
        <Button
          isFloat
          text="+"
          _onClick={() => {
            history.push("/write");
          }}
        ></Button>
      </Permit>
    </React.Fragment>
  );
};

export default PostList;
