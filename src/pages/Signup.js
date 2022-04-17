import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Grid, Text, Input, Button } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../shared/common";

const Signup = () => {
  const dispatch = useDispatch();

  const id = useRef("");
  const pwd = useRef("");
  const pwdCheck = useRef("");
  const userName = useRef("");

  const signup = () => {
    const ID = id.current.value;
    const PWD = pwd.current.value;
    const PWDCHECK = pwdCheck.current.value;
    const USERNAME = userName.current.value;

    if (!ID && !PWD && !USERNAME) {
      return;
    }

    if (!emailCheck(ID)) {
      alert("이메일 형식이 맞지 않습니다!");
      return;
    }

    if (PWD !== PWDCHECK) {
      return;
    }
    dispatch(userActions.signupFB(ID, PWD, USERNAME));
  };

  return (
    <React.Fragment>
      <Grid height="100%" bg="white" padding="16px">
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
            reff={userName}
          />
        </Grid>

        <Grid>
          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            type="password"
            reff={pwd}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요."
            type="password"
            reff={pwdCheck}
          />
        </Grid>

        <Button text="회원가입하기" _onClick={signup}></Button>
      </Grid>
    </React.Fragment>
  );
};

Signup.defaultProps = {};

export default Signup;
