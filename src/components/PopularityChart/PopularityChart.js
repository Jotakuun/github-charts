import React from 'react';
import styles from './PopularityChart.css';
import { connect } from 'react-redux'

import Card from '../shared/Card/Card';

class PopularityChart extends React.Component {
  render() {
    return (
      <Card>
        <div className={styles.PopularityChart}>
        </div>
      </Card>
    );
  }
}

const mapStateToProps = ( state ) => ({
  repos: state.repos.data,
  pickedRepos: state.repos.pickedRepos
});

const mapDispatchToProps = {
  getRadarData(data) {
    dispatch(getRadarData(data))
  }
};

export default connect( mapStateToProps, mapDispatchToProps )( PopularityChart );

