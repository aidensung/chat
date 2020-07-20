import styled, { css } from 'styled-components';

const buttonStyles = css`
  background-color: #f03b2c;
  color: white;
  border: 1px solid #f03b2c;
  border-radius: 8px;

  &:hover {
    background-color: white;
    color: #f03b2c;
  }
`;

const invertedButtonStyles = css`
  background-color: white;
  color: black;
  border: 1px solid black;

  &:hover {
    background-color: black;
    color: white;
    border: none;
  }
`;

const googleSignInStyles = css`
  background-color: #4285f4;
  color: white;

  &:hover {
    background-color: #357ae8;
    border: none;
  }
`;

const getButtonStyles = (props) => {
  if (props.isGoogleSignIn) {
    return googleSignInStyles;
  }

  return props.inverted ? invertedButtonStyles : buttonStyles;
};

export const CustomButtonContainer = styled.button`
  min-width: 140px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 25px;
  font-size: 15px;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  justify-content: center;
  transition: all 300ms ease-out;

  ${getButtonStyles}
`;
