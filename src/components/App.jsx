import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';

import { ContactList } from './ContactList/ContactList';
import { Title, Wrapper } from './App.styled';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) || [];
  });
  const [filter, setFilter] = useState('');

  const nameCheck = name => {
    const normalizedName = name.toLowerCase();
    const checked = contacts.find(
      contact => contact.name.toLowerCase() === normalizedName
    );
    //console.log(checked);
    if (checked) return checked.name;
  };

  const addContact = (name, number) => {
    //console.log(nameCheck(name));

    if (nameCheck(name)) return alert(`${name} is already in contacts`);

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevState => [contact, ...prevState]);
  };

  const changeFilter = evt => {
    setFilter(evt.target.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Wrapper>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={addContact} />

      <Title>Contacts</Title>

      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        filteredContacts={getFilteredContacts()}
        onDelete={deleteContact}
      />
    </Wrapper>
  );
};
