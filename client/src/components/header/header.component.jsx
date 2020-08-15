import React, { useEffect, useState, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
  OptionToggleBtnContainer,
} from './header.styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { ReactComponent as Logo } from '../../assets/chat.svg';

const Header = ({ currentUser, signOutStart }) => {
  const [hidden, setHidden] = useState({
    hidden: true,
  });

  const [height, setHeight] = useState({
    height: 0,
  });

  const headerRef = useRef(null);
  const optionContainerRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (window.scrollY > height) {
      headerRef.current.classList.add('scroll');
      if (!hidden) removeDropdown();
    } else {
      headerRef.current.classList.remove('scroll');
    }
  }, [height, hidden]);

  const handleResize = useCallback(() => {
    if (window.innerWidth > 768) {
      if (!hidden) removeDropdown();
    }
  }, [hidden]);

  const handleClick = useCallback(
    (e) => {
      if (!headerRef.current.contains(e.target)) {
        if (!hidden) removeDropdown();
      }
    },
    [hidden]
  );

  const toggleDropdown = () => {
    optionContainerRef.current.childNodes.forEach((child) =>
      child.classList.toggle('open')
    );
    setHidden(!hidden);
  };

  const removeDropdown = () => {
    optionContainerRef.current.childNodes.forEach((child) =>
      child.classList.remove('open')
    );
    setHidden(true);
  };

  useEffect(() => {
    setHeight(headerRef.current.clientHeight * 0.4);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleClick);
    };
  }, [handleResize, handleScroll, handleClick]);

  return (
    <HeaderContainer ref={headerRef}>
      <LogoContainer to='/'>
        <Logo className='logo' />
      </LogoContainer>
      <OptionsContainer ref={optionContainerRef}>
        <OptionLink className='options' to='/' onClick={removeDropdown}>
          HOME
        </OptionLink>
        <OptionLink
          className='options'
          to='/chat'
          onClick={() => {
            removeDropdown();
            if (!currentUser) alert('Login first');
          }}
        >
          CHAT
        </OptionLink>
        {currentUser ? (
          <OptionLink
            className='options'
            to='/'
            onClick={() => {
              signOutStart();
              removeDropdown();
            }}
          >
            SIGN OUT
          </OptionLink>
        ) : (
          <OptionLink className='options' to='/signin' onClick={removeDropdown}>
            SIGN IN
          </OptionLink>
        )}
      </OptionsContainer>
      <OptionToggleBtnContainer onClick={toggleDropdown}>
        <FontAwesomeIcon id='toggleBtn' icon={faBars} />
      </OptionToggleBtnContainer>
    </HeaderContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
