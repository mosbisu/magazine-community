import React from "react";
import { Grid, Image, Text } from "../elements";

const CommentList = () => {
  return (
    <React.Fragment>
      <Grid padding="16px">
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
      </Grid>
    </React.Fragment>
  );
};

export default CommentList;

const CommentItem = ({
  userProfile,
  userName,
  userID,
  postID,
  contents,
  insertDt,
}) => {
  return (
    <Grid isFlex>
      <Grid isFlex width="auto">
        <Image shape="circle" />
        <Text bold>{userName}</Text>
      </Grid>
      <Grid isFlex margin="0px 4px">
        <Text margin="0px">{contents}</Text>
        <Text margin="0px">{insertDt}</Text>
      </Grid>
    </Grid>
  );
};

CommentItem.defaultProps = {
  userProfile: "",
  userName: "mean0",
  userID: "",
  postID: 1,
  contents: "귀여운 고양이네요!",
  insertDt: "2021-01-01 19:00:00",
};
