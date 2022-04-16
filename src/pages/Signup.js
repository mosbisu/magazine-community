import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Grid, Text, Input, Button } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";

const Signup = () => {
  const dispatch = useDispatch();

  const id = useRef("");
  const pwd = useRef("");
  const pwdCheck = useRef("");
  const userName = useRef("");

  const signup = () => {
    if (!id.current.value && !pwd.current.value && !userName.current.value) {
      return;
    }
    if (pwd.current.value !== pwdCheck.current.value) {
      return;
    }
    dispatch(
      userActions.signupFB(
        id.current.value,
        pwd.current.value,
        userName.current.value
      )
    );
  };

  return (
    <React.Fragment>
      <Grid padding="16px">
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

        <Button text="회원가입하기" _onClick={signup()}></Button>
      </Grid>
    </React.Fragment>
  );
};

Signup.defaultProps = {};

export default Signup;
