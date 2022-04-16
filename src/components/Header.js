import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";

import { history } from "../redux/configureStore";
import { apiKey } from "../shared/firebase";

const Header = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isSession = sessionStorage.getItem(_session_key) ? true : false;

  if (isLogin && isSession) {
    return (
      <React.Fragment>
        <Grid isFlex>
          <Button text="내정보"></Button>
          <Button text="알림"></Button>
          <Button
            text="로그아웃"
            _onClick={() => {
              dispatch(userActions.logOutFB());
            }}
          ></Button>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid isFlex>
        <Button
          text="로그인"
          _onClick={() => {
            history.push("/login");
          }}
        ></Button>
        <Button
          text="회원가입"
          _onClick={() => {
            history.push("/signup");
          }}
        ></Button>
      </Grid>
    </React.Fragment>
  );
};

export default Header;
