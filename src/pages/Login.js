import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Text, Input, Grid, Button } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.user.isLogin);

  const id = useRef("");
  const pwd = useRef("");

  useEffect(() => {
    if (isLogin) {
      alert("이미 로그인이 되어있습니다!");
      navigate("/");
    }
  }, [isLogin, navigate]);

  const login = () => {
    const ID = id.current.value;
    const PWD = pwd.current.value;

    if (!ID && !PWD) {
      alert("아이디 혹은 비밀번호를 입력해주세요!");
      return;
    }
    dispatch(
      userActions.loginDB(ID, PWD, () => {
        navigate("/");
      })
    );
  };

  return (
    <React.Fragment>
      <Grid bg="white" height="calc(100vh - 46px)" padding="16px">
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
            onSubmit={login}
          />
        </Grid>

        <Button
          _onClick={() => {
            login();
          }}
        >
          로그인하기
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
