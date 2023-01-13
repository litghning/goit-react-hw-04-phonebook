import  { useState, useEffect } from 'react';
import Section from './Section/Section';
import Phonebook from './Phonebook/Phonebook';
import Contacts from './Contacts/Contacts';
import Filters from './Filter/Filter';

export default function App () {
 
   const [contacts, setContacts] = useState(JSON.parse(window.localStorage.getItem('contacts')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
    );
    const [filterContact, setFilterContact] = useState ('');
  
useEffect (() => {
  window.localStorage.setItem('contacts', JSON.stringify('contacts'))
},[contacts]);

  const formSubmitData = ({ id, name, number }) => {
    const newContact = { id, name, number };
    const nameNormalise = name.toLowerCase();
    const alertContact = contacts.filter(contact =>
      contact.name.toLowerCase().includes(nameNormalise)
    );
    alertContact.length
      ? alert(`${name} is already in contacts`)
      : 
          setContacts(pr => [...pr, newContact]);
    };
  
  const handleFilter = e => {
    setFilterContact(e.currentTarget.value)
    };

  const getFilterscontact = () => {
    const toNormaliseFilter = filterContact.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(toNormaliseFilter)
    );
  };
  const delContact = contactId => {
      setContacts(contacts.filter(contact => contact.id !== contactId))
    }

    return (
      <div
        style={{
          height: '100vh',
          display: "block",
          marginLeft: "20px",
  

          
        }}
      >
        <Section title="Phonebook">
          <Phonebook onSubmit={formSubmitData} />
        </Section>
        <Section title="Contacts">
          <Filters value={filterContact} onChange={handleFilter} />
          <Contacts
            contacts={getFilterscontact()}
            onDelContact={delContact}
          />
        </Section>
      </div>
    );
      };