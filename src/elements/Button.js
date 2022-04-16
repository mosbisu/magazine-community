import React from "react";
import styled from "styled-components";

const Button = ({ text, _onClick, isFloat }) => {
  if (isFloat) {
    return (
      <React.Fragment>
        <FloatButton onClick={_onClick}>{text}</FloatButton>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ElButton onClick={_onClick}>{text}</ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  text: "텍스트",
  _onClick: () => {},
  isFloat: false,
};

const ElButton = styled.button`
  width: 100%;
  background-color: #212121;
  color: #ffffff;
  padding: 12px 0px;
  box-sizing: border-box;
  border: none;
`;

const FloatButton = styled.button`
  width: 60px;
  height: 60px;
  background-color: #212121;
  color: white;
  box-sizing: border-box;
  font-size: 30px;
  font-weight: 800;
  position: sticky;
  bottom: 5%;
  left: 80%;
  border: none;
  text-align: center;
  border-radius: 30px;
`;

export default Button;
