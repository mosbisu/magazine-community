import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Image, Text } from "../elements";
import { actionCreators as postActions } from "../redux/modules/post";
import { getCookie } from "../shared/Cookie";
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
  isEdit,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const username = getCookie("username");

  const deletePost = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(postActions.deletePostDB(postNo));
      navigate("/");
    }
  };

  return (
    <React.Fragment>
      <Grid margin="20px 0" bg="white" height="100%">
        <Grid isFlex>
          <Grid padding="8px" isFlex width="none">
            <Image shape="circle" src={src} />
            <Text margin="0 0 0 5px" bold>
              {nickname}
            </Text>
          </Grid>
          <Text margin="0 8px 0 0">{createdAt}</Text>
        </Grid>
        <Grid isFlex>
          {username === nickname && isEdit && (
            <React.Fragment>
              <Grid></Grid>
              <Grid width="25%" padding="0 8px" margin="0 0 10px 0">
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
              </Grid>
            </React.Fragment>
          )}
        </Grid>
        {layout === 1 && (
          <React.Fragment>
            <Grid padding="8px">
              <Text>{postContents}</Text>
            </Grid>
            <Grid>
              <Image shape="rectangle" src={images} />
            </Grid>
          </React.Fragment>
        )}
        {layout === 2 && (
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
        {layout === 3 && (
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

        <Grid isFlex padding="8px" height="80px">
          <Grid width="none">
            <Text bold>조회수 {views}</Text>
            <Text bold>좋아요 {likes}개</Text>
          </Grid>
          <Like postNo={postNo} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Post;
