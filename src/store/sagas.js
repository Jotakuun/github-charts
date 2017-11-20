import { take, takeEvery, takeLatest, call, put, fork, race, select } from 'redux-saga/effects';

import {
    GET_REPOS_INFO, GET_REPOS_INFO_SUCCESS, GET_REPOS_INFO_FAILURE,
    GET_RADAR_DATA, GET_RADAR_DATA_SUCCESS, GET_RADAR_DATA_FAILURE,
    SET_RADAR_OPTION_SUCCESS, SET_RADAR_OPTION,
    SEARCH_REPOS, SEARCH_REPOS_SUCCESS, SEARCH_REPOS_FAILURE,
    CLEAN_SEARCH, PICK_REPO, REMOVE_REPO
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

    if (option !== 'Overall') {
        changeDataInAxis = radarData.map((d) => ({
            axis: d.name,
            value: d[option.toLowerCase().replace(/ /g, "_")],
            color: '#258ECF'
        }));
        changeDataInAxis = [changeDataInAxis];
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
    try {
        const pickedRepos = yield select((state) => state.repos.pickedRepos);
        const data = yield call(fetchReposData, pickedRepos);
        yield put({ type: GET_REPOS_INFO_SUCCESS, payload: data });
        yield put({ type: GET_RADAR_DATA, payload: data })
    } catch (err) {
        yield put({ type: GET_REPOS_INFO_FAILURE, payload: err });
    }
}

function* getReposSuggestions(action) {
    try {
        const response = yield call(getSuggestions, action.payload);
        yield put({ type: SEARCH_REPOS_SUCCESS, payload: response.items });

    } catch (err) {
        yield put({ type: SEARCH_REPOS_FAILURE, payload: err });
    }
}

function* pickRepo(action) {
    yield put({ type: GET_REPOS_INFO, payload: null })
}

function getSuggestions(value) {
    return fetchData(apiHost + `search/repositories?q=${value}&sort=stars`);
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
        yield takeLatest(GET_REPOS_INFO, getReposInfo),
        yield takeLatest(GET_REPOS_INFO_SUCCESS, getRadarData),
        yield takeLatest(SET_RADAR_OPTION, radarOptions),
        yield takeLatest(SEARCH_REPOS, getReposSuggestions),
        yield takeLatest(PICK_REPO, pickRepo)
    ]
}