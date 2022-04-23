import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Image, Text } from "../elements";
// import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";
// import { actionCreators as likeActions } from "../redux/modules/like";
import Like from "./Like";

const Post = ({
  nickname,
  postContents,
  postNo,
  layout,
  likes,
  images,
  views,
  createdAt,
  src,
  isMe,
  isEdit,
  id,
  Layout1,
  Layout2,
  Layout3,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deletePost = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      // dispatch(postActions.deleteFB(id));
      dispatch(postActions.deletePostDB(postNo));
      navigate("/");
    }
  };

  // useEffect(() => {
  //   dispatch(likeActions.getLikeFB(id));
  // }, [dispatch, id]);

  return (
    <React.Fragment>
      <Grid margin="20px 0" bg="white" height="100%">
        <Grid isFlex>
          <Grid padding="8px" isFlex width="none">
            <Image shape="circle" src={src} />
            <Text bold>{nickname}</Text>
          </Grid>
          <Grid margin="0 10px 0 120px" width="none">
            {isEdit && (
              <React.Fragment>
                <Button
                  padding="4px"
                  _onClick={() => {
                    navigate(`/write/${postNo}`);
                  }}
                >
                  수정
                </Button>
                <Button margin="5px 0 0 0" padding="4px" _onClick={deletePost}>
                  삭제
                </Button>
              </React.Fragment>
            )}
            <Text>{createdAt}</Text>
          </Grid>
        </Grid>
        {Layout1 && (
          <React.Fragment>
            <Grid padding="8px">
              <Text>{postContents}</Text>
            </Grid>
            <Grid>
              <Image shape="rectangle" src={images} />
            </Grid>
          </React.Fragment>
        )}
        {Layout2 && (
          <React.Fragment>
            <Grid isFlex>
              <Grid>
                <Image shape="rectangle" src={images} />
              </Grid>
              <Grid padding="8px">
                <Text>{postContents}</Text>
              </Grid>
            </Grid>
          </React.Fragment>
        )}
        {Layout3 && (
          <React.Fragment>
            <Grid isFlex>
              <Grid padding="8px">
                <Text>{postContents}</Text>
              </Grid>
              <Grid>
                <Image shape="rectangle" src={images} />
              </Grid>
            </Grid>
          </React.Fragment>
        )}
        {!Layout1 && !Layout2 && !Layout3 ? (
          <React.Fragment>
            <Grid padding="8px">
              <Text>{postContents}</Text>
            </Grid>
            <Grid>
              <Image shape="rectangle" src={images} />
            </Grid>
          </React.Fragment>
        ) : null}
        <Grid isFlex padding="8px" height="80px">
          <Grid>
            {/* <Text bold>댓글 {commentCnt}개</Text> */}
            <Text bold>조회수 {views}</Text>
            <Text bold>좋아요 {likes}개</Text>
          </Grid>
          <Like id={id} />
          {/* <Image
            shape="none"
            src={
              toggleLike
                ? `${process.env.PUBLIC_URL}/assets/redHeart.png`
                : `${process.env.PUBLIC_URL}/assets/emptyHeart.png`
            }
            _onClick={() => {
              setToggleLike(!toggleLike);
            }}
          /> */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Post;
