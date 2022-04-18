import React, { useRef } from "react";
import { Grid, Input, Button } from "../elements";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { useDispatch } from "react-redux";

const CommentWrite = ({ postID }) => {
  const dispatch = useDispatch();
  const commentText = useRef("");

  const write = () => {
    dispatch(commentActions.addCommentFB(postID, commentText.current.value));
    commentText.current.value = "";
  };

  return (
    <React.Fragment>
      <Grid padding="16px" isFlex>
        <Input
          placeholder="댓글 내용을 입력해주세요 :)"
          reff={commentText}
          onSubmit={write}
        />
        <Button
          text="작성"
          width="50px"
          margin="0px 2px 0px 2px"
          _onClick={write}
        ></Button>
      </Grid>
    </React.Fragment>
  );
};

export default CommentWrite;
