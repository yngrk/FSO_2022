const Message = ({ show }) => {
  if (!show) return null;
  else
    return (
      <div id="message">
        <div className="error">
          Too many matches. Try a more specific filter
        </div>
      </div>
    );
};

export default Message;
