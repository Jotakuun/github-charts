import { combineReducers } from 'redux';
import {
    GET_REPOS_INFO, GET_REPOS_INFO_SUCCESS, GET_REPOS_INFO_FAILURE,
    GET_RADAR_DATA, GET_RADAR_DATA_SUCCESS, GET_RADAR_DATA_FAILURE,
    GET_POPULARITY_DATA, GET_POPULARITY_DATA_SUCCESS, GET_POPULARITY_DATA_FAILURE,
    SET_RADAR_OPTION, SET_RADAR_OPTION_SUCCESS,
    SEARCH_REPOS, SEARCH_REPOS_SUCCESS, SEARCH_REPOS_FAILURE,
    CLEAN_SEARCH
} from './actions';

const initial = {
    repos: {
        pickedRepos: [
            { author: 'facebook', name: 'react', color: '#9780ED' },
            { author: 'angular', name: 'angular', color: '#80EDCE' },
            { author: 'vuejs', name: 'vue', color: '#90D492' }
        ],
        data: [],
        suggestions: [],
        loading: true
    },
    radar: {
        data: [],
        radarOptions: ['Overall'],
        optionSelected: 'Overall',
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

        case SEARCH_REPOS:
            return { ...state };
        case SEARCH_REPOS_SUCCESS:
            return { ...state, suggestions: payload };
        case SEARCH_REPOS_FAILURE:
            return { ...state, error: payload};
        case CLEAN_SEARCH:
            return { ...state, suggestions: [] };
    }
    return state;
}

function radar(state = initial.radar, { type, payload }) {
    switch (type) {
        case GET_RADAR_DATA:
            return { ...state, loading: true };
        case GET_RADAR_DATA_SUCCESS: {
            return {
                ...state,
                data: payload.data,
                axis: payload.axis,
                radarOptions: payload.radarOptions,
                loading: false
            };
        }
        case GET_RADAR_DATA_FAILURE:
            return { ...state, loading: false };
        case SET_RADAR_OPTION:
            return { ...state, optionSelected: payload };
        case SET_RADAR_OPTION_SUCCESS:
            return {
                ...state,
                axis: payload.axis
            }
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