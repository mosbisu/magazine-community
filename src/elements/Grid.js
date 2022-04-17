import React from "react";
import styled from "styled-components";

const Grid = ({
  height,
  isFlex,
  width,
  padding,
  margin,
  bg,
  children,
  center,
}) => {
  const styles = {
    isFlex: isFlex,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
    center: center,
    height: height,
  };

  return (
    <React.Fragment>
      <GridBox {...styles}>{children}</GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  children: null,
  isFlex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  center: false,
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding: ${props.padding}` : "")};
  ${(props) => (props.margin ? `margin: ${props.margin}` : "")};
  ${(props) => (props.bg ? `background-color: ${props.bg}` : "")};
  ${(props) =>
    props.isFlex
      ? `display: flex; align-items: center; juscity-content: space-between;`
      : ""}
  ${(props) => (props.center ? `text-align: center;` : "")};
`;

export default Grid;
