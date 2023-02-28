import { SearchFormButton } from './IconButton.styled';
import PropTypes from 'prop-types';

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

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  Icon: PropTypes.node,
}