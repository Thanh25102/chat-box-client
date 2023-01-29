import Message from '../Message/Message';
import { useState, useEffect } from 'react';
import IMessage from '../../Interface/IMessage';
import { useAppDispatch, useAppSelector } from '../../hooks';
import IUser from '../../Interface/IUser';
import { ACTION_TYPE } from '../../action/action.type';
import axios from 'axios';

interface IChatRoom {
  sendMessage: (
    type: 'public' | 'private',
    message: IMessage,
    user?: IUser
  ) => void;
  userRecive: IUser | undefined;
  user: IUser | undefined;
  chatType: 'public' | 'private';
}
const ChatRoom = (props: IChatRoom) => {
  const [chats, setChats] = useState<IMessage[]>([]);
  const [message, setMessage] = useState<string>('');

  const dispatch = useAppDispatch();
  const chatPublic = useAppSelector((state) => state.chatPublicReducer);
  const chatPrivate = useAppSelector((state) => state.chatPrivateReducer);

  useEffect(() => {
    if (props.chatType === 'public') {
      axios.get(process.env.REACT_APP_URL + '/v1/api/users').then((res) => {
        let users: IUser[] = res.data;
        const chatPublic2: IMessage[] = [];
        chatPublic.map((chat) => {
          users.map((u) => {
            if (u.name === chat.name) {
              chatPublic2.push({ ...chat, avatar: u.avatar });
            }
          });
        });
        setChats(chatPublic2);
      });
      setChats(chatPublic);
    } else if (props.chatType === 'private') {
      setChats(chatPrivate.get(props.userRecive?.name || '') || []);
    }
  }, [chatPublic, chatPrivate]);

  const handleSendMessage = () => {
    if (props.chatType === 'public') {
      props.sendMessage(props.chatType, {
        name: props.user?.name || '',
        content: message,
      });
    } else {
      props.sendMessage(
        props.chatType,
        { name: props.user?.name || '', content: message },
        props.userRecive
      );
      dispatch({
        type: ACTION_TYPE.ADD_CHAT_PRIVATE,
        payload: {
          name: props.user?.name,
          content: message,
          key: props.userRecive?.name,
        },
      });
    }
  };

  return (
    <div className="col-md-8 col-xl-6 chat">
      <div className="card">
        <div className="card-header msg_head">
          <div className="d-flex bd-highlight">
            <div className="img_cont">
              <img
                src={require(`../../public/img/${
                  props.userRecive?.avatar || 'andanh.jpg'
                }`)}
                className="rounded-circle user_img"
              />
              <span className="online_icon"></span>
            </div>
            <div className="user_info">
              <span>
                {props.chatType === 'public'
                  ? 'Chat Common'
                  : `Chat with ${props.userRecive?.name}`}
              </span>
              <p>1767 Messages</p>
            </div>
            <div className="video_cam">
              <span>
                <i className="fas fa-video"></i>
              </span>
              <span>
                <i className="fas fa-phone"></i>
              </span>
            </div>
          </div>
          <span id="action_menu_btn">
            <i className="fas fa-ellipsis-v"></i>
          </span>
          <div className="action_menu">
            <ul>
              <li>
                <i className="fas fa-user-circle"></i> View profile
              </li>
              <li>
                <i className="fas fa-users"></i> Add to close friends
              </li>
              <li>
                <i className="fas fa-plus"></i> Add to group
              </li>
              <li>
                <i className="fas fa-ban"></i> Block
              </li>
            </ul>
          </div>
        </div>
        <div className="card-body msg_card_body">
          {chats.map((chat, index) => (
            <Message
              key={index}
              user={props.user}
              userRecive={props.userRecive}
              name={chat.name}
              avatar={chat.avatar}
              content={chat.content}
              className={props.user?.name === chat.name ? 'end' : 'start'}
            />
          ))}
        </div>
        <div className="card-footer">
          <div className="input-group">
            <div className="input-group-append">
              <span className="input-group-text attach_btn">
                <i className="fas fa-paperclip"></i>
              </span>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              name=""
              className="form-control type_msg"
              placeholder="Type your message..."
            ></textarea>
            <div className="input-group-append">
              <span
                className="input-group-text send_btn"
                onClick={handleSendMessage}
              >
                <i className="fas fa-location-arrow"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatRoom;
