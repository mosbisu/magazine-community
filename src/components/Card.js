import React from "react";
import { Grid, Image, Text } from "../elements";

const Card = (props) => {
  const { imageUrl, userName, postID } = props;

  return (
    <Grid padding="16px" is_flex bg="#ffffff" margin="8px 0px">
      <Grid width="auto" margin="0px 8px 0px 0px">
        <Image size={85} shape="square" imageUrl={imageUrl} />
      </Grid>
      <Grid>
        <Text>
          <b>{userName}</b>님이 게시글에 좋아요를 남겼습니다 :)
        </Text>
      </Grid>
    </Grid>
  );
};

Card.defaultProps = {
  imageUrl: "",
  userName: "",
  postID: null,
};

export default Card;
