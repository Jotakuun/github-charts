import React from 'react';
import { connect } from 'react-redux';
import styles from './RadarOptions.css';

import { setRadarOption } from '../../../store/actions';

class RadarOptions extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let options = this.props.options.map((opt, i) => {
            return (
                <li className={styles.RadarOptions__Tag}
                    style={this.props.selected === opt ? { backgroundColor: '#f5f5f5', borderColor: '#f5f5f5' } : undefined}
                    key={'radar-option-' + i}
                    onClick={() => this.props.selectOption(opt)}>
                    {opt}
                </li>
            )
        })
        return (
            <div className={styles.RadarOptions}>
                <span className={styles.RadarOptions__Title}>Display options</span>
                <ul>
                    {options}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    options: state.radar.radarOptions,
    selected: state.radar.optionSelected
});

const mapDispatchToProps = (dispatch) => ({
    selectOption: (selected) => {
        dispatch(setRadarOption(selected))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RadarOptions);