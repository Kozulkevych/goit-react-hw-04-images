import { SearchFormButton } from './IconButton.styled';

export const IconButton = ({
  type = 'button',
  icon: Icon = null,
  children,
}) => {
  return (
    <SearchFormButton type={type}>
      {Icon && <Icon />}
      {children}
    </SearchFormButton>
  );
};
