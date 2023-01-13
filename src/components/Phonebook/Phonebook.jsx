import  { useState } from 'react';
import { nanoid } from 'nanoid';
import css from './Phonebook.module.css';
const Phonebook = ({ onSubmitProp }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setId(nanoid());
    onSubmitProp(id, name, number);
    reset();
  };
  const reset = () => {
    setName('');
    setNumber('');
  };
    return (
      <form onSubmit={handleSubmit} className={css.Form}>
        <label htmlFor="InputId" className={css.Label}>
          Name
          <input
            type="text"
            name="name"
            value={name}
            id="InputId"
            onChange={e => setName(e.target.value)}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            className={css.Input}
            required
          />
        </label>
        <label htmlFor="numberInputId" className={css.Label}>
          Number
          <input
            type="tel"
            name="number"
            value={number}
            onChange={e => setNumber(e.target.value)}
            id="numberInputId"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            className={css.Input}
            required
          />
        </label>
        <button type="submit" className={css.Submit}>
          Add contact
        </button>
      </form>
    );
  };

export default Phonebook;


