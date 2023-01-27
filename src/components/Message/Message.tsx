interface IMessage {
  name: string;
  content: string;
  className: 'start' | 'end';
}
const Message = (props: IMessage) => {
  const { name, content, className } = props;

  return (
    <div className={`d-flex justify-content-${className} mb-4`}>
      <div className="msg_cotainer">
        <span>{name} say :</span>
      </div>
      <div className={`msg_cotainer${className === 'end' ? '_send' : ''}`}>
        {content}
        <span className={`msg_time${className === 'end' ? '_send' : ''}`}>
          {new Date().getHours()}:{new Date().getMinutes()} Today
        </span>
      </div>
    </div>
  );
};
export default Message;
