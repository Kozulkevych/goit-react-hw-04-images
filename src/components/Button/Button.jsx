import { Btn } from './Button.styled';

export const Button = ({ type = 'button', onClick, text }) => {
  return (
    <Btn type={type} onClick={onClick}>
      {text}
    </Btn>
  );
};
