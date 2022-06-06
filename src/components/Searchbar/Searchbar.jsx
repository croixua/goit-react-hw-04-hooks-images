import { Component } from 'react';
import s from './Searchbar.module.css';
import { FiSearch } from 'react-icons/fi';

export default class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleChange = e => {
    const inputValue = e.target.value;

    this.setState({ inputValue });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { inputValue } = this.state;

    if (inputValue.trim() === '') return alert('Введите поисковый запрос');
    this.props.onSubmit(inputValue);

    this.setState({
      inputValue: '',
    });
  };

  render() {
    const { inputValue } = this.state;

    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.button}>
            <FiSearch size="1.5em" />
          </button>

          <input
            value={inputValue}
            onChange={this.handleChange}
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
}
