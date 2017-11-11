import { take, takeEvery, takeLatest, call, put, fork, race, select } from 'redux-saga/effects';

import {
    GET_REPOS_INFO, GET_REPOS_INFO_SUCCESS, GET_REPOS_INFO_FAILURE,
    GET_RADAR_DATA, GET_RADAR_DATA_SUCCESS, GET_RADAR_DATA_FAILURE,
    GET_POPULARITY_DATA, GET_POPULARITY_DATA_SUCCESS, GET_POPULARITY_DATA_FAILURE, SET_RADAR_OPTION_SUCCESS, SET_RADAR_OPTION
} from './actions';

import { apiHost, fetchData } from '../helpers';

import { colors } from '../helpers';

function* getRadarData() {
    try {
        yield take(GET_RADAR_DATA);
        const repos = yield select((state) => state.repos.data);

        let data = repos.map((data, i) => ({
            name: data.name,
            forks: data.forks_count,
            stars: data.stargazers_count,
            subscribers: data.subscribers_count,
            open_issues: data.open_issues_count,
            network: data.network_count,
            url: data.html_url,
            color: colors[i]
        }));

        let dataInAxis = data.map((d) => ([
            { axis: 'Forks', value: d.forks, color: d.color },
            // { axis: 'Stars', value: d.stars, color: d.color},
            { axis: 'Subscribers', value: d.subscribers, color: d.color },
            { axis: 'Open Issues', value: d.open_issues, color: d.color },
            { axis: 'Network', value: d.network, color: d.color }
        ]));

        let radarOptions = dataInAxis[0].map((axis) => axis.axis);
        radarOptions = ['Overall', 'Stars', ...radarOptions]

        yield put({ type: GET_RADAR_DATA_SUCCESS, payload: { data: data, axis: dataInAxis, radarOptions: radarOptions } });
    } catch (err) {
        yield put({ type: GET_RADAR_DATA_FAILURE, payload: err });
    }
}
function* radarOptions() {
    const radarData = yield select((state) => state.radar.data);
    const pickedRepos = yield select((state) => state.repos.pickedRepos);
    const option = yield select((state) => state.radar.optionSelected);

    let changeDataInAxis;

    if(option !== 'Overall') {
        changeDataInAxis = radarData.map((d) => {
            return pickedRepos.map((repo) => ({
                axis: repo.name,
                value: d[option.toLowerCase()],
                color: repo.color
            }));
        });
    } else {
        changeDataInAxis = radarData.map((d) => ([
            { axis: 'Forks', value: d.forks, color: d.color },
            { axis: 'Subscribers', value: d.subscribers, color: d.color },
            { axis: 'Open Issues', value: d.open_issues, color: d.color },
            { axis: 'Network', value: d.network, color: d.color }
        ]));
    }

    yield put({ type: SET_RADAR_OPTION_SUCCESS, payload: { axis: changeDataInAxis } });
}

function* getReposInfo() {
    yield take(GET_REPOS_INFO)
    try {
        const pickedRepos = yield select((state) => state.repos.pickedRepos);
        const data = yield call(fetchReposData, pickedRepos);
        yield put({ type: GET_REPOS_INFO_SUCCESS, payload: data });
        yield put({ type: GET_RADAR_DATA, payload: data })
    } catch (err) {
        yield put({ type: GET_REPOS_INFO_FAILURE, payload: err });
    }
}

function fetchReposData(reposPicked) {
    let requestPromises = reposPicked.map((repo) => {
        return fetchData(apiHost + `repos/${repo.author}/${repo.name}`);
    })
    return Promise.all(requestPromises).then((data) => data)
}

export default function* rootSaga() {
    yield [
        yield fork(getReposInfo),
        yield takeLatest(GET_REPOS_INFO_SUCCESS, getRadarData),
        yield takeLatest(SET_RADAR_OPTION, radarOptions)
    ]
}