import { take, call, put, fork, race } from 'redux-saga/effects';

import {
    GET_REPOS_INFO, GET_REPOS_INFO_SUCCESS, GET_REPOS_INFO_FAILURE,
    GET_RADAR_DATA, GET_RADAR_DATA_SUCCESS, GET_RADAR_DATA_FAILURE,
    GET_POPULARITY_DATA, GET_POPULARITY_DATA_SUCCESS, GET_POPULARITY_DATA_FAILURE
} from './actions';

function* getRadarData({ payload: { repos } }) {
    try {
        yield take(GET_REPOS_INFO_SUCCESS);
        const repos = yield take((state) => state.repos.data);
    } catch (err) {
        yield put({ type: GET_RADAR_DATA_FAILURE, payload: err });
    }
    // todo: simplify these d3.request with a helper
    /* d3.request(apiHost + `repos/${repo.author}/${repo.name}`)
    .mimeType("application/json")
    .response((data) => JSON.parse(data.responseText))
    .get((data) => {
      this.props.getRadarData({ name: data.name,
        forks: data.forks_count,
        stars: data.stargazers_count,
        subscribers: data.subscribers_count,
        open_issues: data.open_issues_count,
        url: data.html_url
      })}
    ); */
}

function* setData() {
    yield* takeEvery(GET_RADAR_DATA, getRadarData);
    yield* takeEvery(GET_POPULARITY_DATA, getPopularityData);
}

function* getReposInfo() {
    // yield* take(GET_REPOS_INFO);
    try {
        const pickedRepos = yield take((state) => state.repos.pickedRepos);
        const data = yield call(apiRequests, pickedRepos);
        yield put({ type: GET_REPOS_INFO_SUCCESS, payload: data });
    } catch (err) {
        yield put({ type: GET_REPOS_INFO_FAILURE, payload: err });
    }
}

// todo: move these api resolvers to another file
function apiRequests(reposPicked) {
    return new Promise((resolve) => {
        d3.request(apiHost + `repos/${repo.author}/${repo.name}`)
            .mimeType("application/json")
            .response((data) => JSON.parse(data.responseText))
            .get((data) => resolve(data));
    });
}



export default function* rootSaga() {
    // Wait for get all repos request
    yield take(GET_REPOS_INFO, getReposInfo);

    // todo

    // yield fork(setData);
}