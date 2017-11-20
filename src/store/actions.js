import { createAction } from 'redux-actions';

// Main Actions
export const GET_REPOS_INFO = 'GET_REPOS_INFO';
export const GET_REPOS_INFO_SUCCESS = 'GET_REPOS_INFO_SUCCESS';
export const GET_REPOS_INFO_FAILURE = 'GET_REPOS_INFO_FAILURE';
export const getReposInfo = createAction(GET_REPOS_INFO);
export const getReposInfoSuccess = createAction(GET_REPOS_INFO_SUCCESS);
export const getReposInfoFail = createAction(GET_REPOS_INFO_FAILURE);

export const PICK_REPO = 'PICK_REPO';
export const pickRepo = createAction(PICK_REPO);
export const REMOVE_REPO = 'REMOVE_REPO';
export const removeRepo = createAction(REMOVE_REPO);


// RadarChart Actions
export const GET_RADAR_DATA = 'GET_RADAR_DATA';
export const GET_RADAR_DATA_SUCCESS = 'GET_RADAR_DATA_SUCCESS';
export const GET_RADAR_DATA_FAILURE = 'GET_RADAR_DATA_FAILURE';
export const getRadarData = createAction(GET_RADAR_DATA);
export const getRadarDataSuccess = createAction(GET_RADAR_DATA_SUCCESS);
export const getRadarDataFail = createAction(GET_RADAR_DATA_FAILURE);
export const SET_RADAR_OPTION = 'SET_RADAR_OPTION';
export const SET_RADAR_OPTION_SUCCESS = 'SET_RADAR_OPTION_SUCCESS';
export const setRadarOption = createAction(SET_RADAR_OPTION);
export const setRadarOptionsSuccess = createAction(SET_RADAR_OPTION_SUCCESS);

// Search Actions
export const SEARCH_REPOS = 'SEARCH_REPOS';
export const SEARCH_REPOS_SUCCESS = 'SEARCH_REPOS_SUCCESS';
export const SEARCH_REPOS_FAILURE = 'SEARCH_REPOS_FAILURE';
export const searchRepos = createAction(SEARCH_REPOS);
export const searchReposSuccess = createAction(SEARCH_REPOS_SUCCESS);
export const searchReposFailure = createAction(SEARCH_REPOS_FAILURE);
export const CLEAN_SEARCH = 'CLEAN_SEARCH';
export const cleanSearch = createAction(CLEAN_SEARCH);

