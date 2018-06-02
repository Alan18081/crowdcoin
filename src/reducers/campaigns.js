import {fromJS} from 'immutable';
import {
  FETCH_CAMPAIGNS_SUCCESS,
  FETCH_ACTIVE_CAMPAIGN_SUCCESS,
  CREATE_CAMPAIGN_START,
  CREATE_CAMPAIGN_SUCCESS,
  CREATE_CAMPAIGN_FAILED,
  CONTRIBUTE_START,
  CONTRIBUTE_SUCCESS,
  CONTRIBUTE_FAILED
} from '../actions/types';

const initialState = fromJS({
  list: fromJS([]),
  activeCampaign: null,
  contributeLoading: false,
  contributeError: null,
  campaignLoading: false,
  campaignError: null
});

export default (state = initialState,{type,payload}) => {
  switch (type) {
    case CONTRIBUTE_START:
      return state.merge({
        contributeLoading: true,
        contributeError: null
      });
    case CONTRIBUTE_SUCCESS:
      return state.set('contributeLoading',false);
    case CONTRIBUTE_FAILED:
      return state.merge({
        contributeLoading: false,
        contributeError: payload
      });
    case CREATE_CAMPAIGN_START:
      return state.merge({
        createCampaignLoading: true,
        createCampaignError: null
      });
    case CREATE_CAMPAIGN_SUCCESS:
      return state.set('createCampaignLoading',false);
    case CREATE_CAMPAIGN_FAILED:
      return state.merge({
        createCampaignLoading: false,
        createCampaignError: payload
      });
    case FETCH_ACTIVE_CAMPAIGN_SUCCESS:
      return state.set('activeCampaign',fromJS(payload));
    case FETCH_CAMPAIGNS_SUCCESS:
      return state.set('list',fromJS(payload));
    default:
      return state;
  }
}