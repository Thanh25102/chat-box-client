import { useState } from 'react';
interface IProps {
  handleLogin: (login: boolean, username: string) => void;
}
const Login = (props: IProps) => {
  const { handleLogin } = props;
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin(true, name);
  };

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <div className="fadeIn first"></div>
        <form className="padding-50" onSubmit={handleSubmit}>
          <input
            type="text"
            id="login"
            className="fadeIn second"
            name="login"
            placeholder="login"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input type="submit" className="fadeIn fourth" value="Log In" />
        </form>
      </div>
    </div>
  );
};
export default Login;
