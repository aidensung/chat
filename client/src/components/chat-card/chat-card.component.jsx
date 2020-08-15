import React from 'react';

import {
  MessageCardContainer,
  MessageContainer,
  SenderAndTimeContainer,
} from './chat-card.styles';

const MessageCard = ({ message, currentUser }) => {
  const { sender, content, time } = message;

  return (
    <MessageCardContainer
      className={sender.email !== currentUser.email ? 'fromsomebody' : 'fromme'}
    >
      <SenderAndTimeContainer>
        <span>
          {sender.email === currentUser.email ? null : sender.firstname}
        </span>
        <span>
          {new Date(time).toLocaleString('en', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
          })}
        </span>
      </SenderAndTimeContainer>
      <MessageContainer
        className={
          sender.email !== currentUser.email ? 'fromsomebody' : 'fromme'
        }
      >
        {content}
      </MessageContainer>
    </MessageCardContainer>
  );
};

export default MessageCard;
