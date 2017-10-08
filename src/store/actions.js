import { createAction } from 'redux-actions';

export const GET_REPOS_INFO = 'GET_REPOS_INFO';
export const GET_REPOS_INFO_SUCCESS = 'GET_REPOS_INFO_SUCCESS';
export const GET_REPOS_INFO_FAILURE = 'GET_REPOS_INFO_FAILURE';
export const getReposInfo = createAction(GET_REPOS_INFO);
export const getReposInfoSucess = createAction(GET_REPOS_INFO_SUCCESS);
export const getReposInfoFail = createAction(GET_REPOS_INFO_FAILURE);

export const GET_RADAR_DATA = 'GET_RADAR_DATA';
export const GET_RADAR_DATA_SUCCESS = 'GET_RADAR_DATA_SUCCESS';
export const GET_RADAR_DATA_FAILURE = 'GET_RADAR_DATA_FAILURE';
export const getRadarData = createAction(GET_RADAR_DATA);
export const getRadarDataSucess = createAction(GET_RADAR_DATA_SUCCESS);
export const getRadarDataFail = createAction(GET_RADAR_DATA_FAILURE);

export const GET_POPULARITY_DATA = 'GET_POPULARITY_DATA';
export const GET_POPULARITY_DATA_SUCCESS = 'GET_POPULARITY_DATA_SUCCESS';
export const GET_POPULARITY_DATA_FAILURE = 'GET_POPULARITY_DATA_FAILURE';
export const getPopularityData = createAction(GET_POPULARITY_DATA);
export const getPopularityDataSucess = createAction(GET_POPULARITY_DATA_SUCCESS);
export const getPopularityDataFail = createAction(GET_POPULARITY_DATA_FAILURE);
