import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Button } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";
import { getCookie } from "../shared/Cookie";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = getCookie("isLogin");

  if (isLogin) {
    return (
      <React.Fragment>
        <Grid bg="#efefef" isFlex position>
          <Grid isFlex>
            <Button _onClick={() => navigate("/")}>홈으로</Button>
            <Button
              _onClick={() => {
                dispatch(userActions.logOutDB(navigate));
                navigate("/");
              }}
            >
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid isFlex>
        <Button
          _onClick={() => {
            navigate("/");
          }}
        >
          홈으로
        </Button>
        <Button
          _onClick={() => {
            navigate("/login");
          }}
        >
          로그인
        </Button>
        <Button
          _onClick={() => {
            navigate("/signup");
          }}
        >
          회원가입
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default Header;
