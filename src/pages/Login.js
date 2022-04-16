import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Text, Input, Grid, Button } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";

const Login = () => {
  const dispatch = useDispatch();

  const id = useRef("");
  const pwd = useRef("");

  const login = () => {
    if (!id.current.value && !pwd.current.value) {
      alert("아이디 혹은 비밀번호를 입력해주세요!");
      return;
    }
    dispatch(userActions.loginFB(id.current.value, pwd.current.value));
  };

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          로그인
        </Text>

        <Grid>
          <Input
            label="아이디"
            placeholder="아이디를 입력해주세요."
            reff={id}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            type="password"
            reff={pwd}
          />
        </Grid>

        <Button
          text="로그인하기"
          _onClick={() => {
            login();
          }}
        ></Button>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
