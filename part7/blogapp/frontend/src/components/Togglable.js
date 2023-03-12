import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function Togglable({ buttonLabel, children }) {
  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  };

  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button type="button" onClick={toggleVisibility}>
          {buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button type="button" onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </div>
  );
}

export default Togglable;
