import React from 'react';
import { connect } from 'react-redux';
import styles from './Navbar.css';

import Autosuggest from 'react-autosuggest';
import { debounce } from '../../helpers';

import { searchRepos, cleanSearch, pickRepo } from '../../store/actions';

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

class Navbar extends React.Component {

  constructor(props) {
    super(props);

    this.searchBy = 'name';
    this.inputProps = {
      placeholder: 'Search...',
      value: '',
      onChange: this.onChange
    };
  }

  onChange = (event, { newValue }) => {
    this.inputProps.value = newValue;
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.props.searchRepos(value);
  };

  onSuggestionsClearRequested = () => {
    this.props.cleanSearch();
  };

  onSuggestionSelected = (event, { suggestion }) => {
    console.log(suggestion)
    this.inputProps.value = '';
    this.props.pickRepo({author: suggestion.owner.login, name: suggestion.name})
  }

  render() {
    return (
      <nav className={styles.Navbar}>
        <div>
          <Autosuggest
            className={styles.Navbar__Search}
            suggestions={this.props.suggestions}
            onSuggestionsFetchRequested={debounce(this.onSuggestionsFetchRequested.bind(this), 400)}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            onSuggestionSelected={this.onSuggestionSelected.bind(this)}
            renderSuggestion={renderSuggestion}
            inputProps={this.inputProps}
          />
        </div>
        <span>In development</span>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  pickedRepos: state.repos.pickedRepos,
  suggestions: state.repos.suggestions
});

const mapDispatchToProps = (dispatch) => ({
  searchRepos: (value) => {
    dispatch(searchRepos(value))
  },
  cleanSearch: () => {
    dispatch(cleanSearch())
  },
  pickRepo: (repo) => {
    dispatch(pickRepo(repo))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
