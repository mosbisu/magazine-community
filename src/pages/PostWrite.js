import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Text, Button, Input } from "../elements";
import { actionCreators as postActions } from "../redux/modules/post";
import { storageService } from "../shared/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import PostLayout from "../components/PostLayout";
import { getCookie } from "../shared/Cookie";

const PostWrite = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const username = getCookie("username");
  const fileInput = useRef("");
  const { postNo } = useParams();
  const postList = useSelector((state) => state.post.list);
  const isLogin = getCookie("isLogin");

  const isEdit = postNo ? true : false;
  const post = isEdit ? postList.find((p) => p.postNo == postNo) : null;
  const [image, setImage] = useState(isEdit ? post.images : null);
  const [content, setContent] = useState(post ? post.postContents : "");
  const [layout, setLayout] = useState(isEdit ? post.layout : 1);

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleLayout = (layout) => {
    setLayout(layout);
  };

  const selectFile = (event) => {
    const {
      target: { files },
    } = event;

    const imageFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = (e) => {
      const {
        currentTarget: { result },
      } = e;
      setImage(result);
    };
  };

  const addEditPost = async () => {
    let IMAGE = "";
    if (image === "") {
      // alert("이미지를 추가해주세요");
      // return;
    } else {
      const fileRef = ref(storageService, `images/${new Date().getTime()}`);
      const response = await uploadString(fileRef, image, "data_url");
      IMAGE = await getDownloadURL(response.ref);
    }
    if (isEdit) {
      const post = {
        images: IMAGE,
        postContents: content,
        postTitle: "",
        layout: layout,
      };

      if (!content) {
        alert("게시글 내용을 입력해주세요!");
        return;
      }

      dispatch(postActions.editPostDB(postNo, post, () => navigate("/")));
    } else {
      if (!content) {
        alert("게시글 내용을 입력해주세요!");
        return;
      }

      const post = {
        images: IMAGE,
        postContents: content,
        postTitle: "",
        nickname: username,
        layout: layout,
      };

      dispatch(postActions.addPostDB(post, () => navigate("/")));
    }
  };

  if (!isLogin) {
    return (
      <Grid
        bg="white"
        height="calc(100vh - 66px)"
        margin="10px 0"
        padding="16px"
        center
      >
        <Text size="32px" bold>
          PLEASE WAIT!
        </Text>
        <Text size="16px">You can write after login!</Text>
        <Button
          _onClick={() => {
            navigate("/login");
          }}
        >
          로그인 하러가기
        </Button>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid bg="white" height="100%" margin="20px 0">
        <Grid isFlex>
          <Button
            _onClick={() => {
              handleLayout(1);
            }}
          >
            1
          </Button>
          <Button
            _onClick={() => {
              handleLayout(2);
            }}
          >
            2
          </Button>
          <Button
            _onClick={() => {
              handleLayout(3);
            }}
          >
            3
          </Button>
        </Grid>
        <Grid padding="16px">
          <Text margin="0px" size="32px" bold>
            {isEdit ? "게시글 수정" : "게시글 작성"}
          </Text>
          <input type="file" ref={fileInput} onChange={selectFile} />
        </Grid>
        <PostLayout
          _onChange={handleContent}
          layout={layout}
          content={content}
          preview={image}
        ></PostLayout>

        <Grid padding="16px">
          <Input
            value={content}
            label="게시글 내용"
            placeholder="게시글 작성"
            multiLine
            _onChange={handleContent}
          />
        </Grid>

        <Grid padding="16px">
          <Button _onClick={addEditPost}>
            {isEdit ? "게시글 수정" : "게시글 작성"}
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PostWrite;
