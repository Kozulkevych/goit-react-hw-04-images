import { Component } from 'react';
import PropTypes from 'prop-types';
import { FcSearch } from "react-icons/fc";
import { IconButton } from '../IconButton/IconButton';
import { toast } from 'react-toastify';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleQueryChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      toast.error("The search string can't be an empty");
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <IconButton type="submit">
            <FcSearch size="25" />
          </IconButton>
          <SearchFormInput
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={this.handleQueryChange}
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
