import IUser from '../../Interface/IUser';

interface IAvaiableUser {
  user: IUser | 'common';
  onClick: (user: IUser | 'common') => void;
}
const AvailableUser = (props: IAvaiableUser) => {
  const { user, onClick } = props;

  return (
    <li className="active" onClick={() => onClick(user)}>
      <div className="d-flex bd-highlight">
        <div className="img_cont">
          <img
            src={require(`../../public/img/${
              user === 'common' ? 'public.jpg' : user.avatar
            }`)}
            className="rounded-circle user_img"
          />
          <span className="online_icon"></span>
        </div>
        <div className="user_info">
          <span>{user === 'common' ? 'Chat Common' : user.name}</span>
          <p>{user === 'common' ? 'Chat Common' : user.name} is online</p>
        </div>
      </div>
    </li>
  );
};
export default AvailableUser;
