import React from 'react';
import { connect } from 'react-redux';
import styles from './Navbar.css';
import PropTypes from 'prop-types';

class Navbar extends React.Component {

  constructor(props) {
    super(props);
  }

  pickRepos() {
    return [
      { author: 'facebook', name: 'react' },
      { author: 'angular', name: 'angular' },
      { author: 'vue', name: 'vue' }
    ]
  }
  render() {
    return (
      <nav className={styles.Navbar}>
        <span>Nav</span>
        <span>In early development</span>
      </nav>
    );
  }
}

Navbar.propTypes = {
  store: PropTypes.shape({
    pickedRepos: PropTypes.arrayOf(
      PropTypes.shape({
        author: PropTypes.number.isRequired,
        name: PropTypes.bool.isRequired,
      }).isRequired
    )
  })
}

const mapStateToProps = ( state ) => ( {
  pickedRepos: state.repos.pickedRepos
} );

export default connect( mapStateToProps )( Navbar );
