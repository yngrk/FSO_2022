import React from 'react';
import PropTypes from 'prop-types';

function ErrorMessage({ message }) {
  ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
  };
  if (message.type !== null) {
    return (<div className={message.type}>{message.text}</div>);
  }
}

export default ErrorMessage;
