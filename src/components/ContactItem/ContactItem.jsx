import PropTypes from 'prop-types';
import { ContactName, ContactPhone, DeleteBtn } from './ContactItem.styled';

export const ContactItem = ({ name, number, onDelete, id }) => {
  return (
    <>
      <ContactName>{name}:</ContactName>
      <ContactPhone>{number}</ContactPhone>
      <DeleteBtn type="button" onClick={() => onDelete(id)}>
        Delete
      </DeleteBtn>
    </>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  onDelete: PropTypes.func,
  id: PropTypes.string,
};
