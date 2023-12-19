const Notification = ({ notification }: { notification: string }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    color: 'green',
  };
  const error = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    color: 'red',
  };
  if (notification === '') {
    return;
  }
  if (notification.includes('error')) {
    return <div style={error}>{notification}</div>;
  }
  return <div style={style}>{notification}</div>;
};

export default Notification;
