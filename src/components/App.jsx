import { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import Gallery from './Gallery/Gallery';
import s from './App.module.css';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      <Gallery searchQuery={searchQuery} />
    </div>
  );
}
