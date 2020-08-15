import styled from 'styled-components';

export const MessageCardContainer = styled.div`
  margin-bottom: 6px;
  display: flex;
  flex-direction: column;

  &.fromme {
    align-items: flex-end;
  }

  &.fromsomebody {
    align-items: flex-start;
  }

  @media screen and (min-width: 768px) {
    margin-bottom: 12px;
  }
`;

export const SenderAndTimeContainer = styled.div`
  color: #575757;
  display: flex;
  flex-direction: row;
  margin-bottom: 4px;
  align-items: flex-end;

  span:first-child {
    margin-right: 4px;
    font-size: 0.8em;
  }

  span:nth-child(2) {
    font-size: 0.6em;
  }
`;

export const MessageContainer = styled.div`
  padding: 6px;
  border-radius: 10px;
  overflow-wrap: break-word;
  max-width: 90%;
  box-shadow: 1px 1px grey;
  font-size: 0.9em;

  &.fromme {
    background-color: #ffc7c2;
  }

  &.fromsomebody {
    border: 1px solid grey;
  }
`;
