import {combineReducers} from 'redux';
import campaigns from './campaigns';
import requests from './requests';
import {reducer as form} from 'redux-form';
import {routerReducer} from 'react-router-redux';

export default combineReducers({
  campaigns,
  requests,
  router: routerReducer,
  form
});
