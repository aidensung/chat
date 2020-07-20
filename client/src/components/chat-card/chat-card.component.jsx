import React from 'react';

const MessageCard = ({ message }) => {
  const { sender, content, time } = message;

  return (
    <div style={{ padding: '0 5px', marginBottom: '8px' }}>
      <span>{sender.firstname} </span>
      <span>{new Date(time).toLocaleString()}</span>
      <br />
      <span>{content}</span>
    </div>
  );
};

export default MessageCard;
