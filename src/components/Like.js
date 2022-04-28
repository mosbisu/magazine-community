import React, { useEffect, useState } from "react";
import { actionCreators as postActions } from "../redux/modules/post";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { getCookie } from "../shared/Cookie";

const Like = ({ postNo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = getCookie("isLogin");
  const username = getCookie("username");
  const isLike = false;

  const [checkLike, setCheckLike] = useState(null);

  useEffect(() => {
    setCheckLike(isLike ? true : false);
  }, [isLike]);

  const handleLike = () => {
    if (!isLogin) {
      alert("로그인 후 좋아요를 누를 수 있습니다.");
      return navigate("/login");
    }

    if (!checkLike) {
      dispatch(postActions.postLikeDB(postNo, 1, username));
    } else {
      dispatch(postActions.postLikeDB(postNo, -1, username));
    }
    setCheckLike(!checkLike);
  };
  return (
    <Checkbox
      onClick={handleLike}
      icon={<FavoriteBorder />}
      checkedIcon={<Favorite />}
      color="error"
    />
  );
};

export default Like;
