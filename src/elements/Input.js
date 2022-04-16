import React from "react";
import styled from "styled-components";

import { Text, Grid } from "./index";

const Input = ({ label, placeholder, type, reff }) => {
  return (
    <React.Fragment>
      <Grid>
        <Text margin="0px">{label}</Text>
        <ElInput ref={reff} type={type} placeholder={placeholder} />
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  label: "텍스트",
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
};

const ElInput = styled.input`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

export default Input;
