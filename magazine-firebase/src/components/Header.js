import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Button, Text } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";

// import { history } from "../redux/configureStore";
// import NotiBadge from "./NotiBadge";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);

  if (isLogin) {
    return (
      <React.Fragment>
        <Grid bg="#efefef" isFlex position>
          <Grid isFlex>
            <Button _onClick={() => navigate("/")}>홈으로</Button>
            {/* <NotiBadge /> */}
            <Button
              _onClick={() => {
                dispatch(userActions.logOutDB());
                navigate("/login");
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
