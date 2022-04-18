import React from "react";
import styled from "styled-components";

import { Text, Grid } from "./index";

const Input = ({ label, placeholder, type, reff, multiLine, onSubmit }) => {
  if (multiLine) {
    return (
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <ElTextarea ref={reff} rows={10} placeholder={placeholder}></ElTextarea>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <ElInput
          ref={reff}
          type={type}
          placeholder={placeholder}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onSubmit(e);
            }
          }}
        />
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  multiLine: false,
  onSubmit: () => {},
};

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

const ElInput = styled.input`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

export default Input;
