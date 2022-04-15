import React, { useEffect, useState } from "react";
import { Grid, Button } from "../elements";
import { deleteCookie, getCookie } from "./Cookie";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    let cookie = getCookie("user_id");
    console.log(cookie);

    if (cookie) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);
  if (isLogin) {
    return (
      <React.Fragment>
        <Grid is_flex>
          <Button text="내정보"></Button>
          <Button text="알림"></Button>
          <Button
            text="로그아웃"
            _onClick={() => {
              deleteCookie("user_id");
            }}
          ></Button>
        </Grid>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Grid is_flex>
        <Button text="로그인"></Button>
        <Button text="회원가입"></Button>
      </Grid>
    </React.Fragment>
  );
};

export default Header;
