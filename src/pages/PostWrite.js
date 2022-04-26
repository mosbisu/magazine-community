import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Text, Button, Image, Input } from "../elements";
import { actionCreators as postActions } from "../redux/modules/post";
import { storageService } from "../shared/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { authService } from "../shared/firebase";
import { v4 as uuidv4 } from "uuid";
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

  const img = useRef("");
  const [init, setInit] = React.useState(false);
  const [userObj, setUserObj] = React.useState(null);

  useEffect(() => {
    // firebase observer to see if user is logged in:
    authService.onAuthStateChanged((user) => {
      if (user) {
        // if user is logged in:

        setUserObj(user);
      } else {
        // user is not logged in:
      }
      setInit(true);
    });
  }, []);

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

  const addPost = async () => {
    const CONTENTS = contents.current.value;
    let IMAGE = "";
    if (image === "") {
      alert("이미지를 추가해주세요");
    } else {
      const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(fileRef, image, "data_url");
      IMAGE = await getDownloadURL(response.ref);
    }
    const post = {
      images: IMAGE,
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
