import  { useState, useEffect } from 'react';
import Section from './Section/Section';
import Phonebook from './Phonebook/Phonebook';
import Contacts from './Contacts/Contacts';
import Filters from './Filter/Filter';

export default function App () {
    const [contacts, setContacts] = useState(
      JSON.parse(window.localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      ]
    );
    const [filterContact, setFilterContact] = useState('');
  
    useEffect(() => {
      window.localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);
  
    const formSubmitData = (id, name, number) => {
      const newContact = { id, name, number };
      const alertContact = contacts.filter(contact =>
        contact.name.toLowerCase().includes(name.toLowerCase())
      );
      alertContact.length
        ? alert(`${name} is already in contacts`)
        : setContacts(pr => [...pr, newContact]);
    };

    const getFilterscontact = () => {
      const toNormaliseFilter = filterContact.toLowerCase();
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(toNormaliseFilter)
      );
    };
    const delContact = contactId => {
      setContacts(contacts.filter(contact => contact.id !== contactId));
    };
    const handleFilter = e => {
      setFilterContact(e.currentTarget.value);
    };
  
    return (
      <div
        style={{
          height: '100vh',
        }}
      >
        <Section title="Phonebook">
          <Phonebook onSubmitProp={formSubmitData} />
        </Section>
        <Section title="Contacts">
          <Filters value={filterContact} onChange={handleFilter} />
          <Contacts contacts={getFilterscontact()} onDelContact={delContact} />
        </Section>
      </div>
    );
  };