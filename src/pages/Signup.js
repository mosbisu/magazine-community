import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Text, Input, Button } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../shared/common";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const isLogin = useSelector((state) => state.user.isLogin);

  const id = useRef("");
  const nickname = useRef("");
  const email = useRef("");
  const pw = useRef("");

  // useEffect(() => {
  //   if (isLogin) {
  //     alert("이미 로그인이 되어있습니다!");
  //     history.replace("/");
  //   }
  // }, [history, isLogin]);

  const signup = () => {
    const ID = id.current.value;
    const NICKNAME = nickname.current.value;
    const EMAIL = email.current.value;
    const PW = pw.current.value;

    if (!ID && !PW && !NICKNAME && !EMAIL) {
      return;
    }

    // if (!emailCheck(EMAIL)) {
    //   alert("이메일 형식이 맞지 않습니다!");
    //   return;
    // }

    dispatch(
      userActions.signupDB(ID, NICKNAME, EMAIL, PW, () => {
        navigate("/login");
      })
    );
  };

  return (
    <React.Fragment>
      <Grid height="calc(100vh - 46px)" bg="white" padding="16px">
        <Text size="32px" bold>
          회원가입
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
            label="닉네임"
            placeholder="닉네임을 입력해주세요."
            reff={nickname}
          />
        </Grid>

        <Grid>
          <Input
            label="이메일"
            placeholder="이메일 입력해주세요."
            reff={email}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            type="password"
            reff={pw}
          />
        </Grid>

        <Button _onClick={signup}>회원가입하기</Button>
      </Grid>
    </React.Fragment>
  );
};

export default Signup;
