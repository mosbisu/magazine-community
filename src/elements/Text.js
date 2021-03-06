import styled from "styled-components";

const Text = ({ bold, color, size, margin, children, _onClick }) => {
  // const { bold, color, size, children } = props;

  const styles = { bold: bold, color: color, size: size, margin: margin };

  return (
    <P {...styles} onClick={_onClick}>
      {children}
    </P>
  );
};

Text.defaultProps = {
  children: null,
  bold: false,
  color: "#222831",
  size: "14px",
  margin: false,
  _onClick: () => {},
};

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? 600 : 400)};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  word-break: break-all;
  white-space: pre-line;
  box-sizing: border-box;
`;

export default Text;
