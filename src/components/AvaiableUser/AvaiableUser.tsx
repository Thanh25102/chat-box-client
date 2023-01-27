import IUser from '../../Interface/IUser';

interface IAvaiableUser {
  user: IUser;
  onClick: (user: IUser) => void;
}
const AvailableUser = (props: IAvaiableUser) => {
  const { user, onClick } = props;
  return (
    <li className="active" onClick={() => onClick(user)}>
      <div className="d-flex bd-highlight">
        <div className="img_cont">
          <img
            src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
            className="rounded-circle user_img"
          />
          <span className="online_icon"></span>
        </div>
        <div className="user_info">
          <span>{user.name}</span>
          <p>{user.name} is offline</p>
        </div>
      </div>
    </li>
  );
};
export default AvailableUser;
