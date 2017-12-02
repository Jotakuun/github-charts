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
    this.state = { highlight: null };
    this.colors = colors;
    this.removeRepo = this.removeRepo.bind(this);
  }

  removeRepo(repo) {
    this.props.removeRepo(repo);
  }
  hightlight = (repo, color) => {
    if (repo) {
      this.setState({ highlight: { ...repo, color: color } });
    } else {
      this.setState({ highlight: null });

    }
  }
  render() {
    const pickedRepos = this.props.repos.map((repo, index) => {
      return (
        <li key={index}>
          <RepoCard repo={repo} color={this.colors[index]} delete={this.removeRepo} highlight={this.hightlight} />
        </li>
      );
    });

    return (
      <div className={styles.Dashboard__Container}>
        <aside className={styles.Dashboard__Aside}>
          <ul>{pickedRepos}</ul>
        </aside>
        <div className={styles.Dashboard__Body}>
          <section className={styles.Dashboard__Chart}>
            <RadarChart highlightRepo={this.state.highlight} />
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
