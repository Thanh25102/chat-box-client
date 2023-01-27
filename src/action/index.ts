import IMessage from '../Interface/IMessage';
import { ACTION_TYPE } from './action.type';

interface AddChatPublic {
  type: ACTION_TYPE.ADD_CHAT_PUBLIC;
  payload?: IMessage;
}
interface AddChatPrivate {
  type: ACTION_TYPE.ADD_CHAT_PRIVATE;
  payload?: IMessage;
}
export type Action = AddChatPublic;
export type Actionx = AddChatPrivate;
