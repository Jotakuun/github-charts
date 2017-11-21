import React from 'react';
import styles from './Dashboard.css';
import RadarChart from '../RadarChart/RadarChart';
import RepoCard from '../RepoCard/RepoCard';
import { connect } from 'react-redux';
import { apiHost, fetchRepoData } from '../../helpers';
import { getReposInfo, removeRepo } from '../../store/actions';
import { colors } from '../../helpers';

import * as d3 from 'd3';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.colors = colors;
    this.removeRepo = this.removeRepo.bind(this);
  }
  componentWillMount() {
    console.log(this.props)
    if (this.props.pickedRepos) {
      this.props.getReposData(this.props.pickedRepos);
    }
  }
  removeRepo(repo) {
    this.props.removeRepo(repo);
  }
  render() {
    const pickedRepos = this.props.repos.map((repo, index) => {
      return (
        <li key={index}>
          <RepoCard repo={repo} color={this.colors[index]} delete={this.removeRepo} />
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
  getReposData: (pickedRepos) => {
    dispatch(getReposInfo(pickedRepos))
  },
  removeRepo: (repo) => {
    dispatch(removeRepo(repo))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
