import IMessage from '../Interface/IMessage';
import { Action, Actionx } from '../action';
import { ACTION_TYPE } from '../action/action.type';
const initialState: IMessage[] = [];
const initialStateX: Map<string, IMessage[]> = new Map();

export const ChatPublicReducer = (
  chatPublics: IMessage[] = initialState,
  action: Action
): IMessage[] => {
  switch (action.type) {
    case ACTION_TYPE.ADD_CHAT_PUBLIC:
      if (action.payload) {
        let tempChatPublics = [...chatPublics];
        tempChatPublics.push(action.payload);
        return tempChatPublics;
      }
      return chatPublics;
    default:
      return chatPublics;
  }
};

export const ChatPrivateReducer = (
  chatPrivates: Map<string, IMessage[]> = initialStateX,
  action: Actionx
): Map<string, IMessage[]> => {
  switch (action.type) {
    case ACTION_TYPE.ADD_CHAT_PRIVATE:
      if (action.payload) {
        let tempMap = new Map(chatPrivates);
        if (tempMap.get(action.payload?.key || '')) {
          tempMap.get(action.payload?.key || '')?.push(action.payload);
        } else {
          let list = [];
          list.push(action.payload);
          tempMap.set(action.payload?.key || '', list);
        }
        return tempMap;
      }
      return chatPrivates;
    default:
      return chatPrivates;
  }
};
