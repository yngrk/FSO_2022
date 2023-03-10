import React from 'react';
import PropTypes from 'prop-types';

function ErrorMessage({ message }) {
  ErrorMessage.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    message: PropTypes.object.isRequired,
  };
  if (message.type !== null) {
    return (<div id="error-msg" className={message.type}>{message.text}</div>);
  }
}

export default ErrorMessage;
