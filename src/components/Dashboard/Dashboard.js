import React from 'react';
import styles from './Dashboard.css';
import RadarChart from '../RadarChart/RadarChart';
import PopularityChart from '../PopularityChart/PopularityChart';
import RepoCard from '../RepoCard/RepoCard';
import { connect } from 'react-redux';
import { apiHost, fetchRepoData } from '../../helpers';
import { getReposInfo } from '../../store/actions';
import { colors } from '../../helpers';

import * as d3 from 'd3';


class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.colors = colors;
  }
  componentWillMount() {
    if (this.props.pickedRepos) {
      this.props.getReposData(this.props.pickedRepos);
    }
  }
  render() {
    const pickedRepos = this.props.repos.map((repo, index) => {
      return (
        <li key={index}>
          <RepoCard repo={repo} color={this.colors[index]} />
        </li>
      );
    })

    return (
      <div className={styles.Dashboard__Container}>
        <aside className={styles.Dashboard__Aside}>
          <ul>{pickedRepos}</ul>
        </aside>
        <div className={styles.Dashboard__Body}>
          <section className={styles.Dashboard__Chart}>
            <RadarChart />
          </section>
          <section className={styles.Dashboard__Chart}>
            <PopularityChart />
          </section>
        </div>
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
