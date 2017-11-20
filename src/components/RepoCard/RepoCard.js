import React from 'react';
import styles from './RepoCard.css';

import Card from '../shared/Card/Card';

export default class RepoCard extends React.Component {
    render() {

        let homepageShortcut = this.props.repo.homepage ? this.props.repo.homepage.slice(this.props.repo.homepage.lastIndexOf('/') + 1): undefined;
        return (
            <Card>
                <div className={styles.RepoCard}
                    style={{ borderColor: this.props.color, borderTopWidth: 3, borderTopStyle: 'solid' }}>
                    <div className={styles.RepoCard__Title}>
                        <span className={styles.RepoCard__Author}>{this.props.repo.owner.login}/</span>
                        <span className={styles.RepoCard__Name}>{this.props.repo.name}</span>
                    </div>
                    <a className={styles.RepoCard__Homepage} href={this.props.repo.homepage}>
                        {homepageShortcut}
                    </a>
                </div>
            </Card>
        )
    }
}