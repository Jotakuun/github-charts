import React from 'react';
import styles from './RepoCard.css';

import Card from '../shared/Card/Card';

export default class RepoCard extends React.Component {
    render() {
        let repo = this.props.repo;
        let homepageShortcut = repo.homepage ? repo.homepage.slice(repo.homepage.lastIndexOf('/') + 1) : undefined;
        return (
            <Card>
                <div className={styles.RepoCard}
                    style={{ borderColor: this.props.color, borderTopWidth: 3, borderTopStyle: 'solid' }}>
                    <div className={styles.RepoCard__Title}>
                        <span className={styles.RepoCard__Author}>{repo.owner.login}/</span>
                        <span className={styles.RepoCard__Name}>{repo.name}</span>
                    </div>
                    <a className={styles.RepoCard__Homepage} href={repo.homepage}>
                        {homepageShortcut}
                    </a>
                    <svg className={styles.RepoCard__Delete} viewBox="0 0 40 40" onClick={() => this.props.delete({id: repo.id, name: repo.name, author: repo.owner.login })}>
                        <path className={styles.RepoCard__DeleteIcon} d="M 10,10 L 30,30 M 30,10 L 10,30" />
                    </svg>
                </div>
            </Card>
        )
    }
}