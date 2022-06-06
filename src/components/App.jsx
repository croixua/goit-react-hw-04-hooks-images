import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import Gallery from './Gallery/Gallery';
import s from './App.module.css';

export default class App extends Component {
  state = {
    searchQuery: '',
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <Gallery searchQuery={searchQuery} />
      </div>
    );
  }
}
