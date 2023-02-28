import React from 'react';

function ErrorMessage({ message }) {
  if (message.type !== null) {
    return (<div className={message.type}>{message.text}</div>);
  }
}

export default ErrorMessage;
