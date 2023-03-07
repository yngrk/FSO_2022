import React from 'react';
import { useSelector } from 'react-redux';

function Notification() {
  const notification = useSelector((state) => state.notification);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  if (notification !== null) {
    return (
      <div style={style}>
        {notification}
      </div>
    );
  }
}

export default Notification;
