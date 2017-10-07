import React from 'react';
import Navbar from './Navbar/Navbar';

import styles from './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.route.state
    }
  }

  setPickedRepos(repos) {
    console.log('repos', repos)
    this.props.route.setMainState({
      ...this.state,
      pickedRepos: repos
    })
  }

  render(){
    return (
      <div className={styles.Container}>
        <header className={styles.Header}>
          <Navbar getPickedRepos={ (repos) => this.setPickedRepos(repos) } />
        </header>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
