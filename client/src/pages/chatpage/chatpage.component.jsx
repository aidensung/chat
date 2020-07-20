import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
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

import { ChatPageContainer } from './chatpage.styles';

import MessageCard from '../../components/chat-card/chat-card.component';

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
  const [chatMessage, setChatMessage] = useState('');

  const [messageInfo, setMessageInfo] = useState({
    content: '',
    sender: '',
    time: '',
    type: '',
  });

  const messageEndRef = useRef(null);

  const handleChange = (event) => {
    setChatMessage(event.target.value);

    setMessageInfo({
      content: chatMessage,
      sender: currentUser,
      time: new Date(),
      type: 'Text',
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    sendMessageStart(messageInfo);

    setChatMessage('');
  };

  useEffect(() => {
    getMessagesStart();

    const socket = io(ENDPOINT);

    socket.on('message', (messageFromServer) => {
      addMessage(messageFromServer);
    });

    return () => {
      socket.emit('disconnect');
      window.location.reload();
    };
  }, [getMessagesStart, addMessage]);

  useLayoutEffect(() => {
    messageEndRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  });

  return (
    <ChatPageContainer>
      <div
        style={{
          width: '100%',
          height: '100%',
          margin: '0 auto',
          paddingTop: '50px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            position: 'relative',
            height: '85%',
            overflowY: 'scroll',
          }}
        >
          {messages &&
            messages.map((message) => (
              <MessageCard key={message._id} message={message} />
            ))}
          <div ref={messageEndRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ height: '15%', position: 'relative' }}
        >
          <textarea
            placeholder="Let's start talking"
            type='text'
            name='chatMessage'
            lable='chatMessage'
            value={chatMessage}
            onChange={handleChange}
            onKeyUp={(event) => {
              if (event.keyCode === 13) {
                if (event.shiftKey) return;
                handleSubmit(event);
              }
            }}
            style={{
              height: '100%',
              width: '100%',
              border: 'none',
              borderTop: '1px solid',
            }}
          ></textarea>
          <button
            type='submit'
            style={{
              position: 'absolute',
              right: '15px',
              top: '-40px',
              width: '80px',
              height: '30px',
            }}
          >
            ENTER
          </button>
        </form>
      </div>
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
