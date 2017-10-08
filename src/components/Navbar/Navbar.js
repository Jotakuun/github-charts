import React from "react";
import styles from "./Navbar.css";

class Navbar extends React.Component {

  constructor(props) {
    super(props);
  }
  componentWillMount() {
    if (this.props.getPickedRepos) {
      this.props.getPickedRepos(this.pickRepos());
    }
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
        <span >Nav</span>
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

export default Navbar;