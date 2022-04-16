import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Text, Button, Image, Input } from "../elements";
import Upload from "../shared/Upload";
import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";

const PostWrite = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const contents = useRef("");

  const addPost = () => {
    dispatch(postActions.addPostFB(contents.current.value));
  };

  if (!isLogin) {
    return (
      <Grid margin="100px 0" padding="16px" center>
        <Text size="32px" bold>
          PLEASE WAIT!
        </Text>
        <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
        <Button
          text="로그인 하러가기"
          _onClick={() => {
            history.replace("/");
          }}
        ></Button>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text margin="0px" size="32px" bold>
          게시글 작성
        </Text>
        <Upload />
      </Grid>

      <Grid>
        <Grid padding="16px">
          <Text margin="0px" size="20px" bold>
            미리보기
          </Text>
        </Grid>

        <Image shape="rectangle" />
      </Grid>

      <Grid padding="16px">
        <Input
          reff={contents}
          label="게시글 내용"
          placeholder="게시글 작성"
          multiLine
        />
      </Grid>

      <Grid padding="16px">
        <Button text="게시글 작성" _onClick={addPost}></Button>
      </Grid>
    </React.Fragment>
  );
};

export default PostWrite;
