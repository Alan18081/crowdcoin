import {fromJS} from 'immutable';

import {
  FETCH_REQUESTS_SUCCESS,
  CREATE_REQUEST_SUCCESS,
  CREATE_REQUEST_START,
  CREATE_REQUEST_FAILED
} from '../actions/types';

const initialState = fromJS({
  list: null,
  loading: false,
  error: null,
  approversCount: 0
});

export default (state = initialState,{type,payload}) => {
  switch (type) {
    case FETCH_REQUESTS_SUCCESS:
      return state.merge({
        list: fromJS(payload.requests),
        approversCount: payload.approversCount
      });
    case CREATE_REQUEST_START:
      return state.merge({
        loading: true,
        error: null
      });
    case CREATE_REQUEST_SUCCESS:
      return state.set('loading',false);
    case CREATE_REQUEST_FAILED:
      return state.merge({
        loading: false,
        error: payload
      });
    default:
      return state;
  }
};