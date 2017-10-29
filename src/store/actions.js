import { createAction } from 'redux-actions';

export const GET_REPOS_INFO = 'GET_REPOS_INFO';
export const GET_REPOS_INFO_SUCCESS = 'GET_REPOS_INFO_SUCCESS';
export const GET_REPOS_INFO_FAILURE = 'GET_REPOS_INFO_FAILURE';
export const getReposInfo = createAction(GET_REPOS_INFO);
export const getReposInfoSuccess = createAction(GET_REPOS_INFO_SUCCESS);
export const getReposInfoFail = createAction(GET_REPOS_INFO_FAILURE);

export const SET_REPOS = 'SET_REPOS';
export const setRepos = createAction(SET_REPOS);

export const GET_RADAR_DATA = 'GET_RADAR_DATA';
export const GET_RADAR_DATA_SUCCESS = 'GET_RADAR_DATA_SUCCESS';
export const GET_RADAR_DATA_FAILURE = 'GET_RADAR_DATA_FAILURE';
export const getRadarData = createAction(GET_RADAR_DATA);
export const getRadarDataSuccess = createAction(GET_RADAR_DATA_SUCCESS);
export const getRadarDataFail = createAction(GET_RADAR_DATA_FAILURE);

export const GET_POPULARITY_DATA = 'GET_POPULARITY_DATA';
export const GET_POPULARITY_DATA_SUCCESS = 'GET_POPULARITY_DATA_SUCCESS';
export const GET_POPULARITY_DATA_FAILURE = 'GET_POPULARITY_DATA_FAILURE';
export const getPopularityData = createAction(GET_POPULARITY_DATA);
export const getPopularityDataSuccess = createAction(GET_POPULARITY_DATA_SUCCESS);
export const getPopularityDataFail = createAction(GET_POPULARITY_DATA_FAILURE);

// test
export const CHANGE_AXIS = 'CHANGE_AXIS';
export const changeAxis = createAction(CHANGE_AXIS);
