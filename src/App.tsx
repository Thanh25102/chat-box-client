import './App.css';
import ChatRoom from './components/ChatRoom/ChatRoom';
import NavigationUser from './components/NavigationUser/NavigationUser';
import { useRef, useState, useEffect } from 'react';
import Login from './components/Login/Login';
import SockJS from 'sockjs-client';
import { over, Client, Frame, Message } from 'stompjs';
import IMessage from './Interface/IMessage';
import IUser from './Interface/IUser';
import { useAppDispatch } from './hooks';
import { ACTION_TYPE } from './action/action.type';
function App() {
  let stompClient = useRef<Client>();
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState<IUser | undefined>();
  const [userRecive, setUserRecive] = useState<IUser | undefined>();
  const [chatType, setChatType] = useState<'public' | 'private'>('public');

  const dispatch = useAppDispatch();

  const handleLogin = (login: boolean, name: string) => {
    setIsLogin(login);
    setUser({ name });
  };

  useEffect(() => {
    if (isLogin) {
      connect();
    }
  }, [isLogin]);

  const connect = () => {
    var socket = new SockJS('http://localhost:8080/ws');
    stompClient.current = over(socket);
    stompClient.current.connect({ username: user?.name }, onConnected, onErr);
  };

  const onConnected = () => {
    stompClient.current?.subscribe('/topic/common', (payload) => {
      let message: IMessage = JSON.parse(payload.body);
      dispatch({ type: ACTION_TYPE.ADD_CHAT_PUBLIC, payload: message });
    });
    stompClient.current?.subscribe(`/user/queue/private`, (payload) => {
      let message: IMessage = JSON.parse(payload.body);
      dispatch({
        type: ACTION_TYPE.ADD_CHAT_PRIVATE,
        payload: { ...message, key: message.name },
      });
    });
  };

  const sendMessage = (
    type: 'private' | 'public',
    message: IMessage,
    user?: IUser
  ) => {
    if (type === 'public') {
      sendPublicMessage(message);
    } else if (user !== undefined) {
      sendPrivateMessage(user, message);
    }
  };

  const sendPublicMessage = (message: IMessage) => {
    if (stompClient.current) {
      let chatMessage = message;
      stompClient.current.send('/app/common', {}, JSON.stringify(chatMessage));
    }
  };

  const sendPrivateMessage = (user: IUser, message: IMessage) => {
    if (stompClient.current) {
      stompClient.current.send(
        '/app/specific-user',
        {},
        JSON.stringify({ user, message })
      );
    }
  };

  const onErr = (err?: Frame | string) => {
    console.log(err + 'gi` z ba');
  };

  const openChatUser = (user: IUser) => {
    setUserRecive(user);
    setChatType('private');
  };
  return (
    <div className="App">
      {isLogin || <Login handleLogin={handleLogin} />}
      {isLogin && (
        <div className="container-fluid h-100">
          <div className="row justify-content-center h-100">
            <NavigationUser onClick={openChatUser} />
            <ChatRoom
              sendMessage={sendMessage}
              userRecive={userRecive}
              user={user}
              chatType={chatType}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
