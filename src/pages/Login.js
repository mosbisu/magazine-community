import React from "react";
import { Text, Input, Grid, Button } from "../elements";
import { getCookie, setCookie } from "../shared/Cookie";

const Login = () => {
  console.log(getCookie("user_id"));
  const login = () => {
    setCookie("user_id", "perl", 3);
    setCookie("user_pwd", "pppp", 3);
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
            _onChange={() => {
              console.log("아이디");
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            _onChange={() => {
              console.log("비밀번호");
            }}
          />
        </Grid>

        <Button
          text="로그인하기"
          _onClick={() => {
            console.log("로그인");
            login();
          }}
        ></Button>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
