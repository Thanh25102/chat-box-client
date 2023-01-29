import IUser from '../../Interface/IUser';
import { useEffect, useState } from 'react';
interface IMessage {
  name: string;
  user: IUser | undefined;
  userRecive: IUser | undefined;
  content: string;
  avatar?: string;
  className: 'start' | 'end';
}
const Message = (props: IMessage) => {
  const { name, content, className } = props;
  const [avatar, setAvatar] = useState(props.user?.avatar);

  useEffect(() => {
    if (name === props.user?.name) {
      setAvatar(props.user.avatar);
    } else if (name === props.userRecive?.name) {
      setAvatar(props.userRecive.avatar);
    }
    if (props.avatar !== undefined) {
      setAvatar(props.avatar);
    }
  });

  console.log(props.user, props.userRecive, name);

  return (
    <div className={`d-flex justify-content-${className} mb-4`}>
      {name === props.user?.name ? (
        <>
          <div className={`msg_cotainer${className === 'end' ? '_send' : ''}`}>
            {content}
            <span className={`msg_time${className === 'end' ? '_send' : ''}`}>
              {new Date().getHours()}:{new Date().getMinutes()} Today
            </span>
          </div>
          <div className="img_cont_msg">
            <img
              src={require(`../../public/img/${avatar || 'andanh.jpg'}`)}
              className="rounded-circle user_img_msg"
            />
          </div>
        </>
      ) : (
        <>
          <div className="img_cont_msg">
            <img
              src={require(`../../public/img/${avatar || 'andanh.jpg'}`)}
              className="rounded-circle user_img_msg"
            />
          </div>
          <div className={`msg_cotainer${className === 'end' ? '_send' : ''}`}>
            {content}
            <span className={`msg_time${className === 'end' ? '_send' : ''}`}>
              {new Date().getHours()}:{new Date().getMinutes()} Today
            </span>
          </div>
        </>
      )}
    </div>
  );
};
export default Message;
