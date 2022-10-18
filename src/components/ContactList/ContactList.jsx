import PropTypes from 'prop-types';
import { ContactItem } from 'components/ContactItem/ContactItem';
import { ContactItemStyle } from './ContactList.styled';

export const ContactList = ({ filteredContacts, onDelete }) => {
  return (
    <ul>
      {filteredContacts.map(({ id, name, number }) => (
        <ContactItemStyle key={id}>
          <ContactItem
            name={name}
            number={number}
            onDelete={onDelete}
            id={id}
          />
        </ContactItemStyle>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  filteredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  onDelete: PropTypes.func,
};
