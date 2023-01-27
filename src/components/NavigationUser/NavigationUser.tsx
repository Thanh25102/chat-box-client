import axios from 'axios';
import { useState, useEffect } from 'react';
import IUser from '../../Interface/IUser';
import AvailableUser from '../AvaiableUser/AvaiableUser';

interface INavigationUser {
  onClick: (user: IUser) => void;
}
const NavigationUser = (props: INavigationUser) => {
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    axios
      .get('http://localhost:8080/v1/api/users')
      .then((res) => setUsers(res.data));
  }, [users]);

  return (
    <div className="col-md-4 col-xl-3 chat">
      <div className="card mb-sm-3 mb-md-0 contacts_card">
        <div className="card-header">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search..."
              name=""
              className="form-control search"
            />
            <div className="input-group-prepend">
              <span className="input-group-text search_btn">
                <i className="fas fa-search"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="card-body contacts_body">
          <ul className="contacts">
            {users.map((user, index) => (
              <AvailableUser user={user} key={index} onClick={props.onClick} />
            ))}
          </ul>
        </div>
        <div className="card-footer"></div>
      </div>
    </div>
  );
};
export default NavigationUser;
