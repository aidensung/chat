import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 50px;
  padding: 8px;
  background: white;
  transition: all 300ms ease-out;
  /* box-shadow: 0px 2px 2px 0 grey; */

  &.scroll {
    background: white;
    box-shadow: 0px 2px 2px 0 grey;
  }

  @media screen and (min-width: 768px) {
    height: 70px;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const LogoContainer = styled(Link)`
  width: 36px;
  height: 36px;
  padding: 2px 0 0;
  transition: all 300ms ease-out;

  .logo {
    height: 100%;
    width: 100%;
  }

  &:hover {
    transform: scale(1.1);
  }

  @media screen and (min-width: 768px) {
    width: 50px;
    height: 50px;
    margin: 0 2px;
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: flex-end;
  text-align: center;

  > *:first-child {
    margin-top: 14px;
  }

  @media screen and (min-width: 768px) {
    flex-direction: row;
    width: 350px;
    justify-content: space-around;

    > *:first-child {
      margin: auto 0;
    }
  }
`;

export const OptionLink = styled(Link)`
  display: none;
  width: 100%;
  padding: 6px;
  margin: 4px 0;
  cursor: pointer;

  color: #f03b2c;
  background: white;
  box-shadow: 4px 4px 4px 0 grey;

  &:hover {
    color: white;
    background: #f03b2c;
  }

  &.open {
    display: block;
  }

  @media screen and (min-width: 768px) {
    display: block;
    font-size: 1.05em;
    padding: 10px 12px;
    margin: auto 6px;
    border-radius: 8px;
    box-shadow: none;
  }
`;

export const OptionToggleBtnContainer = styled.a`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 22px;
  height: 22px;
  transition: all 300ms ease-out;

  #toggleBtn {
    width: 100%;
    height: 100%;
  }

  &:hover {
    transform: scale(1.1);
  }

  @media screen and (min-width: 768px) {
    display: none;
  }
`;
