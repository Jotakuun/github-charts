import { take, takeEvery, takeLatest, call, put, fork, race, select } from 'redux-saga/effects';

import {
    GET_REPOS_INFO, GET_REPOS_INFO_SUCCESS, GET_REPOS_INFO_FAILURE,
    GET_RADAR_DATA, GET_RADAR_DATA_SUCCESS, GET_RADAR_DATA_FAILURE,
    GET_POPULARITY_DATA, GET_POPULARITY_DATA_SUCCESS, GET_POPULARITY_DATA_FAILURE
} from './actions';

import { apiHost, fetchData } from '../helpers';

function* getRadarData() {
    try {
        yield take(GET_RADAR_DATA);
        const repos = yield select((state) => state.repos.data);
        let data = repos.map((data) => ({
            name: data.name,
            forks: data.forks_count,
            stars: data.stargazers_count,
            subscribers: data.subscribers_count,
            open_issues: data.open_issues_count,
            url: data.html_url
        }));
        yield put({ type: GET_RADAR_DATA_SUCCESS, payload: data });
    } catch (err) {
        yield put({ type: GET_RADAR_DATA_FAILURE, payload: err });
    }
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
        yield takeLatest(GET_REPOS_INFO_SUCCESS, getRadarData)
    ]
}