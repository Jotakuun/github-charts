import React from 'react';
import { connect } from 'react-redux';
import styles from './Navbar.css';

import Autosuggest from 'react-autosuggest';
import { debounce } from '../../helpers';

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
  <li>
    {suggestion.name}
  </li>
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
    // dispatch search
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    return (
      <nav className={styles.Navbar}>
        <div>
          <Autosuggest
            suggestions={this.props.suggestions}
            onSuggestionsFetchRequested={debounce(this.onSuggestionsFetchRequested.bind(this), 300)}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
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
  search: (value) => {
    dispatch(search(value))
  }
});

export default connect(mapStateToProps)(Navbar);
