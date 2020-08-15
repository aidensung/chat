import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import io from 'socket.io-client';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectMessages } from '../../redux/chat/chat.selectors';

import {
  getMessagesStart,
  sendMessageStart,
  addMessage,
} from '../../redux/chat/chat.actions';

import {
  ChatPageContainer,
  MessagesContainer,
  FormContainer,
  InputContainer,
  ButtonContainer,
  SearchInputContainer,
  ScrollDownBtnContainer,
} from './chatpage.styles';

import MessageCard from '../../components/chat-card/chat-card.component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

let ENDPOINT;

if (process.env.NODE_ENV === 'development') {
  ENDPOINT = 'http://localhost:5000';
} else {
  ENDPOINT = 'https://chat-aiden.herokuapp.com';
}

const ChatPage = ({
  currentUser,
  messages,
  getMessagesStart,
  sendMessageStart,
  addMessage,
}) => {
  const [messageInfo, setMessageInfo] = useState({
    content: '',
    sender: '',
    time: '',
    type: '',
  });

  const [searchField, setSearchField] = useState('');

  const messageEndRef = useRef(null);

  const messagesRef = useRef(null);

  const handleChange = (event) => {
    setMessageInfo({
      content: event.target.value,
      sender: currentUser,
      time: new Date(),
      type: 'Text',
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!messageInfo.content) return;
    sendMessageStart(messageInfo);
    setMessageInfo({ content: '' });
  };

  const handleSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  const scrollDownToBottom = () => {
    messageEndRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  const handleScroll = useCallback(() => {
    const messagesRefCurrent = messagesRef.current;
    const messagesScrollHeight = messagesRefCurrent.scrollHeight;
    const messagesContainerHeight = messagesRefCurrent.clientHeight;
    const scrollDown = document.querySelector('.scroll-down');

    messagesRefCurrent.scrollTop + messagesContainerHeight >
    messagesScrollHeight - messagesContainerHeight / 2
      ? scrollDown.classList.remove('visible')
      : scrollDown.classList.add('visible');
  }, [messagesRef]);

  useEffect(() => {
    getMessagesStart();
  }, [getMessagesStart]);

  useEffect(() => {
    const socket = io(ENDPOINT);

    socket.on('message', (messageInfo) => {
      addMessage(messageInfo);
    });

    return () => {
      socket.disconnect();
    };
  }, [addMessage]);

  useEffect(() => {
    const messagesRefCurrent = messagesRef.current;

    messagesRefCurrent.addEventListener('scroll', handleScroll);

    return () => {
      messagesRefCurrent.removeEventListener('scroll', handleScroll);
    };
  }, [messagesRef, handleScroll]);

  useLayoutEffect(() => {
    scrollDownToBottom();
  });

  return (
    <ChatPageContainer>
      <MessagesContainer ref={messagesRef}>
        {messages &&
          messages
            .filter((message) =>
              message.content.toLowerCase().includes(searchField.toLowerCase())
            )
            .map((message) => {
              return (
                <MessageCard
                  key={message._id}
                  message={message}
                  currentUser={currentUser}
                />
              );
            })}
        <div ref={messageEndRef} />
      </MessagesContainer>

      <FormContainer autoComplete='off' onSubmit={handleSubmit}>
        <InputContainer
          placeholder='Type your message'
          type='text'
          name='chatMessage'
          lable='chatMessage'
          value={messageInfo.content}
          onChange={handleChange}
        />
        <div style={{ width: '45%', maxWidth: '180px' }}>
          <SearchInputContainer
            autoComplete='off'
            placeholder='Search'
            onChange={handleSearchChange}
            type='text'
            value={searchField}
          />
        </div>
        <ButtonContainer type='submit'>Send</ButtonContainer>
      </FormContainer>

      <ScrollDownBtnContainer
        onClick={scrollDownToBottom}
        className='scroll-down'
      >
        <FontAwesomeIcon icon={faChevronDown} />
      </ScrollDownBtnContainer>
    </ChatPageContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  messages: selectMessages,
});

const mapDispatchToProps = (dispatch) => ({
  getMessagesStart: () => dispatch(getMessagesStart()),
  sendMessageStart: (messageInfo) => dispatch(sendMessageStart(messageInfo)),
  addMessage: (messageFromServer) => dispatch(addMessage(messageFromServer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
