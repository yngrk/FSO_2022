import React from 'react';

function Notification({ notification }) {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (notification === null) return null;
  return <div style={style}>{notification}</div>;
}

export default Notification;
