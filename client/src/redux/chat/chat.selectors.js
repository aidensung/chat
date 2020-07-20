import { createSelector } from 'reselect';

const selectChat = (state) => state.chat;

export const selectMessages = createSelector(
  [selectChat],
  (chat) => chat.messages
);

export const selectError = createSelector([selectChat], (chat) => chat.error);
