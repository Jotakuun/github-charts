import { take, call, put, fork, race, select } from 'redux-saga/effects';

import {
    GET_REPOS_INFO, GET_REPOS_INFO_SUCCESS, GET_REPOS_INFO_FAILURE,
    GET_RADAR_DATA, GET_RADAR_DATA_SUCCESS, GET_RADAR_DATA_FAILURE,
    GET_POPULARITY_DATA, GET_POPULARITY_DATA_SUCCESS, GET_POPULARITY_DATA_FAILURE
} from './actions';

import { apiHost, fetchData } from '../helpers';

function* getRadarData({ payload: { repos } }) {
    try {
        yield take(GET_REPOS_INFO_SUCCESS);
        const repos = yield take((state) => state.repos.data);
    } catch (err) {
        yield put({ type: GET_RADAR_DATA_FAILURE, payload: err });
    }
}

function* setData() {
    yield* takeEvery(GET_RADAR_DATA, getRadarData);
    yield* takeEvery(GET_POPULARITY_DATA, getPopularityData);
}

function* getReposInfo() {
    yield take(GET_REPOS_INFO)
    try {
        const pickedRepos = yield select((state) => state.repos.pickedRepos);
        const data = yield call(apiRequests, pickedRepos);
        yield put({ type: GET_REPOS_INFO_SUCCESS, payload: data });
    } catch (err) {
        yield put({ type: GET_REPOS_INFO_FAILURE, payload: err });
    }
}

function apiRequests(reposPicked) {
    let requestPromises = reposPicked.map((repo) =>{
        return fetchData(apiHost + `repos/${repo.author}/${repo.name}`);
    })
    return Promise.all(requestPromises).then((data) => data)
}

export default function* rootSaga() {
    yield fork(getReposInfo);

    // yield fork(setData);
}