import { PropTypes } from 'prop-types';
import { IconContext } from 'react-icons';
import { BsSearch } from 'react-icons/bs';
import {
  SearchBarContainer,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './SearchBar.styled';

const { Component } = require('react');

export class SearchBar extends Component {
  state = {
    inputValue: '',
  };

  handleFormSubmit = e => {
    const { inputValue } = this.state;
    const { onSubmit } = this.props;

    e.preventDefault();
    let request = inputValue.toLowerCase().trim();
    onSubmit(request);
    this.reset();
  };

  handleFormInput = e => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  reset = () => {
    this.setState({
      inputValue: '',
    });
  };

  render() {
    const { inputValue } = this.state;
    const { handleFormSubmit, handleFormInput } = this;

    return (
      <SearchBarContainer>
        <SearchForm onSubmit={handleFormSubmit}>
          <SearchFormInput
            name="input"
            type="text"
            value={inputValue}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleFormInput}
          />
          <IconContext.Provider value={{ size: '20px' }}>
            <SearchFormButton type="submit">
              <BsSearch />
            </SearchFormButton>
          </IconContext.Provider>
        </SearchForm>
      </SearchBarContainer>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
