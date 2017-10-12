import React from 'react';
import { connect } from 'react-redux';

import Navbar from './Navbar/Navbar';

import styles from './App.css';

class App extends React.Component {
  render(){
    return (
      <div className={styles.Container}>
        <header className={styles.Header}>
          <Navbar />
        </header>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ( state ) => ( {
  repos: state.repos.data,
} );

export default connect( mapStateToProps )( App );
