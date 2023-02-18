const Button = ({ text, onClick }) => {
  return (
    <button type="submit" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
