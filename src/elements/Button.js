import React from "react";
import styled from "styled-components";

const Button = ({
  text,
  _onClick,
  isFloat,
  margin,
  padding,
  width,
  children,
}) => {
  if (isFloat) {
    return (
      <React.Fragment>
        <FloatButton onClick={_onClick}>{children}</FloatButton>
      </React.Fragment>
    );
  }

  const styles = {
    margin: margin,
    width: width,
    padding: padding,
  };

  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick}>
        {children}
      </ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  text: "텍스트",
  _onClick: () => {},
  isFloat: false,
  margin: false,
  width: "100%",
  padding: "10px 0",
};

const ElButton = styled.button`
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  background-color: #212121;
  color: #ffffff;
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border: 1px solid #434343;
  cursor: pointer;
`;

const FloatButton = styled.button`
  width: 60px;
  height: 60px;
  background-color: #212121;
  color: white;
  box-sizing: border-box;
  font-size: 30px;
  font-weight: 800;
  position: fixed;
  bottom: 5%;
  right: 5%;
  border: none;
  text-align: center;
  border-radius: 30px;
  cursor: pointer;

  @media screen and (min-width: 480px) {
    right: 35%;
  }
`;

export default Button;
