import React from 'react';
import styles from './Dashboard.css';
import RadarChart from '../RadarChart/RadarChart';
import PopularityChart from '../PopularityChart/PopularityChart';
import { connect } from 'react-redux';
import { apiHost, fetchRepoData } from '../../helpers';
import { getReposInfo } from '../../store/actions';

import * as d3 from 'd3';

class Dashboard extends React.Component {
  componentWillMount() {
    if (this.props.pickedRepos) {
      this.props.getReposData(this.props.pickedRepos);
    }
  }
  render() {
    const pickedRepos = this.props.pickedRepos.map((repo, index) => {
      return (
        <li key={index}>author: {repo.author}  - name: {repo.name}</li>
      );
    })

    return (
      <div className={styles.Dashboard__Container}>
        <aside className={styles.Dashboard__Aside}>
          <ul>{pickedRepos}</ul>
        </aside>
        <section className={styles.Dashboard__Chart}>
          <RadarChart />
        </section>
        <section className={styles.Dashboard__Chart}>
          <PopularityChart />
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  repos: state.repos.data,
  pickedRepos: state.repos.pickedRepos
});

const mapDispatchToProps = (dispatch) => ({
  getReposData(pickedRepos) {
    dispatch(getReposInfo(pickedRepos))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
