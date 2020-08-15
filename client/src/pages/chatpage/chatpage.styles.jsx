import styled from 'styled-components';

export const ChatPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-top: 50px;
  font-family: 'Roboto', sans-serif;

  @media screen and (min-width: 768px) {
    padding-top: 70px;
  }
`;

export const MessagesContainer = styled.div`
  height: 93%;
  overflow-y: scroll;
  padding: 0 8px;

  @media screen and (min-width: 768px) {
    padding: 0 20px;
  }
`;

export const FormContainer = styled.form`
  height: 7%;
  min-height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #f03b2c;
`;

export const InputContainer = styled.input`
  width: 100%;
  min-width: 120px;
  min-height: 34px;
  margin: 8px;
  padding: 6px;
  padding-left: 10px;
  border: none;
  border-radius: 17px;

  &:focus {
    outline: none;
  }
`;

export const ButtonContainer = styled.button`
  border: none;
  width: 80px;
  min-height: 34px;
  margin: 8px;
  padding: 8px;
  border-radius: 17px;
  font-weight: 700;
  color: #f03b2c;
  background-color: white;
  transition: all 300ms ease-out;

  &:focus {
    outline: none;
  }
  &:hover {
    color: white;
    background-color: #ff9d94;
  }
`;

export const SearchInputContainer = styled.input`
  width: 100%;
  min-height: 34px;
  padding: 6px;
  padding-left: 10px;
  border: none;
  border-radius: 17px;

  &:focus {
    outline: none;
  }
`;

export const ScrollDownBtnContainer = styled.div`
  position: fixed;
  bottom: 65px;
  right: 10px;
  width: 30px;
  height: 30px;
  padding-top: 3px;
  display: none;
  justify-content: center;
  align-items: center;
  font-size: 1.3em;
  color: white;
  background-color: #f03b2c;
  border-radius: 50%;

  &.visible {
    display: flex;
  }

  @media screen and (min-width: 768px) {
    right: 25px;
  }
`;
