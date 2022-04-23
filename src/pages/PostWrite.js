import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Text, Button, Image, Input } from "../elements";
import { actionCreators as postActions } from "../redux/modules/post";
// import { actionCreators as imageActions } from "../redux/modules/image";
import { useNavigate, useParams } from "react-router-dom";

const PostWrite = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contents = useRef("");
  const fileInput = useRef("");
  const [image, setImage] = useState("");
  const { postNo } = useParams();
  const postList = useSelector((store) => store.post.list);

  const isEdit = postNo ? true : false;
  const post = isEdit ? postList.find((p) => p.postNo == postNo) : null;

  useEffect(() => {
    if (isEdit) {
      contents.current.value = post ? post.postContents : "";
    }
  }, [isEdit, post]);

  const selectFile = () => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const addPost = () => {
    const CONTENTS = contents.current.value;
    const post = {
      // images: image,
      postContents: CONTENTS,
      postTitle: "",
      nickname: "KR",
    };

    if (!CONTENTS) {
      alert("게시글 내용을 입력해주세요!");
      return;
    }

    dispatch(postActions.addPostDB(post, () => navigate("/")));
  };

  const editPost = () => {
    const CONTENTS = contents.current.value;
    const post = {
      // images: image,
      postContents: CONTENTS,
      postTitle: "",
    };

    if (!CONTENTS) {
      alert("게시글 내용을 입력해주세요!");
      return;
    }

    dispatch(postActions.editPostDB(postNo, post, () => navigate("/")));
  };

  // if (!isLogin) {
  //   return (
  //     <Grid
  //       bg="white"
  //       height="calc(100vh - 46px)"
  //       margin="100px 0"
  //       padding="16px"
  //       center
  //     >
  //       <Text size="32px" bold>
  //         PLEASE WAIT!
  //       </Text>
  //       <Text size="16px">You can write after login!</Text>
  //       <Button
  //         text="로그인 하러가기"
  //         _onClick={() => {
  //           history.replace("/login");
  //         }}
  //       ></Button>
  //     </Grid>
  //   );
  // }

  return (
    <React.Fragment>
      <Grid bg="white" height="100%" margin="20px 0">
        <Grid padding="16px">
          <Text margin="0px" size="32px" bold>
            {isEdit ? "게시글 수정" : "게시글 작성"}
          </Text>
          <input type="file" ref={fileInput} onChange={selectFile} />
        </Grid>

        <Grid>
          <Grid padding="16px">
            <Text margin="0px" size="20px" bold>
              미리보기
            </Text>
          </Grid>

          <Image
            shape="rectangle"
            src={image ? image : "http://via.placeholder.com/400x300"}
          />
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
          {isEdit ? (
            <Button _onClick={editPost}>게시글 수정</Button>
          ) : (
            <Button _onClick={addPost}>게시글 작성</Button>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PostWrite;
