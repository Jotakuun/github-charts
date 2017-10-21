import { combineReducers } from 'redux';
import {
    GET_REPOS_INFO, GET_REPOS_INFO_SUCCESS, GET_REPOS_INFO_FAILURE,
    GET_RADAR_DATA, GET_RADAR_DATA_SUCCESS, GET_RADAR_DATA_FAILURE,
    GET_POPULARITY_DATA, GET_POPULARITY_DATA_SUCCESS, GET_POPULARITY_DATA_FAILURE,
    SET_REPOS
} from './actions';

const initial = {
    repos: {
        pickedRepos: [
            { author: 'facebook', name: 'react' },
            { author: 'angular', name: 'angular' }
        ],
        data: [],
        loading: true
    },
    radar: {
        data: [],
        loading: true
    },
    popularity: {
        data: [],
        loading: true
    },
};

function repos(state = initial.repos, { type, payload }) {
    switch (type) {
        case GET_REPOS_INFO:
            return { ...state, loading: true };
        case GET_REPOS_INFO_SUCCESS:
            return { ...state, data: payload, loading: false };
        case GET_REPOS_INFO_FAILURE:
            return { ...state, loading: false };

        case SET_REPOS:
            return { ...state, data: payload };
    }
    return state;
}

function radar(state = initial.radar, { type, payload }) {
    switch (type) {
        case GET_RADAR_DATA:
            return { ...state, loading: true };
        case GET_RADAR_DATA_SUCCESS:{
            return { ...state, data: payload, loading: false };
        }
        case GET_RADAR_DATA_FAILURE:
            return { ...state, loading: false };
    }
    return state;
}

function popularity(state = initial.popularity, { type, payload }) {
    switch (type) {
        case GET_POPULARITY_DATA:
            return { ...state, loading: true };
        case GET_POPULARITY_DATA_SUCCESS:
            return { ...state, data: payload.data, loading: false };
        case GET_POPULARITY_DATA_FAILURE:
            return { ...state, loading: false };
    }
    return state;
}

export default combineReducers(
    { repos, radar, popularity }
);