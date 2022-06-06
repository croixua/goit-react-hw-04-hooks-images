import { useState } from 'react';
import s from './Searchbar.module.css';
import { FiSearch } from 'react-icons/fi';

export default function Searchbar({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = e => {
    const inputValue = e.target.value;

    setInputValue(inputValue);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (inputValue.trim() === '') return alert('Введите поисковый запрос');
    onSubmit(inputValue);

    setInputValue('');
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={handleSubmit}>
        <button type="submit" className={s.button}>
          <FiSearch size="1.5em" />
        </button>

        <input
          value={inputValue}
          onChange={handleChange}
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
