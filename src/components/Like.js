import React, { useEffect, useState } from "react";
import { actionCreators as postActions } from "../redux/modules/post";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const Like = ({ postNo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const isLogin = useSelector((state) => state.user.isLogin);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // 체크 안한 상태
  const [checkLike, setCheckLike] = useState(null);

  // useEffect(() => {
  //   setCheckLike(isLike ? true : false);
  // }, [isLike]);

  // 하트누르면 post안에 먹혀서 post detail 페이지로 갔다가 뒤로가기누르면
  // required로 감 ...  아니면 한 번 더 누르거나..
  // const updateLike = () => {
  //   if (!isLogin) {
  //     window.alert("로그인시 하트를 누를 수 있습니다❤️");
  //     return navigate("/login");
  //   }
  // };
  const handleLike = () => {
    if (!checkLike) {
      dispatch(postActions.postLikeDB(postNo, 1));
    } else {
      dispatch(postActions.postLikeDB(postNo, -1));
    }
    setCheckLike(!checkLike);
  };
  return (
    <Checkbox
      onClick={handleLike}
      {...label}
      icon={<FavoriteBorder />}
      checkedIcon={<Favorite />}
      color="error"
    />
  );
};

export default Like;
