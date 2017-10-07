import React from 'react';
import styles from './Dashboard.css';
import RadarChart from '../RadarChart/RadarChart';
import PopularityChart from '../PopularityChart/PopularityChart';

import * as d3 from 'd3';

//provisional
const apiHost = 'https:/api.github.com/';

d3.request(apiHost + 'repos/facebook/react')
  .mimeType("application/json")
  .response((data) => JSON.parse(data.responseText))
  .get((res) => console.log(res));

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.route.state
    };
  }
  render() {
    const pickedRepos = this.state.pickedRepos.map((repo, index) => {
      return(
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
