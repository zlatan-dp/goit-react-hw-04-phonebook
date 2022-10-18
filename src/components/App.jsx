import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';

import { ContactList } from './ContactList/ContactList';
import { Title, Wrapper } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  nameCheck = name => {
    const normalizedName = name.toLowerCase();
    const checked = this.state.contacts.find(
      contact => contact.name.toLowerCase() === normalizedName
    );
    //console.log(checked);
    if (checked) return checked.name;
  };

  addContact = (name, number) => {
    //console.log(this.nameCheck(name));

    if (this.nameCheck(name)) return alert(`${name} is already in contacts`);

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  changeFilter = evt => {
    this.setState({ filter: evt.target.value });
  };

  getFilteredContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();

    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  componentDidMount() {
    const contatcs = JSON.parse(localStorage.getItem('contacts'));
    if (contatcs) {
      this.setState({ contacts: contatcs });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const filteredContacts = this.getFilteredContacts();

    return (
      <Wrapper>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={this.addContact} />

        <Title>Contacts</Title>

        <Filter value={this.state.filter} onChange={this.changeFilter} />
        <ContactList
          filteredContacts={filteredContacts}
          onDelete={this.deleteContact}
        />
      </Wrapper>
    );
  }
}
