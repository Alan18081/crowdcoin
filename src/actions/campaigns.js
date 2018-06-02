import {
  FETCH_CAMPAIGNS,
  FETCH_CAMPAIGNS_SUCCESS,
  FETCH_ACTIVE_CAMPAIGN,
  FETCH_ACTIVE_CAMPAIGN_SUCCESS,
  CREATE_CAMPAIGN,
  CREATE_CAMPAIGN_START,
  CREATE_CAMPAIGN_SUCCESS,
  CREATE_CAMPAIGN_FAILED,
  CONTRIBUTE,
  CONTRIBUTE_START,
  CONTRIBUTE_SUCCESS,
  CONTRIBUTE_FAILED
} from './types';

export const fetchCampaigns = () => ({
  type: FETCH_CAMPAIGNS
});

export const fetchCampaignsSuccess = (campaigns) => ({
  type: FETCH_CAMPAIGNS_SUCCESS,
  payload: campaigns
});

export const fetchActiveCampaign = address => ({
  type: FETCH_ACTIVE_CAMPAIGN,
  payload: address
});

export const fetchActiveCampaignSuccess = (info) => ({
  type: FETCH_ACTIVE_CAMPAIGN_SUCCESS,
  payload: info
});

export const createCampaign = (minimumContribution,cb) => ({
  type: CREATE_CAMPAIGN,
  payload: {
    minimumContribution,
    cb
  }
});

export const createCampaignStart = () => ({
  type: CREATE_CAMPAIGN_START
});

export const createCampaignSuccess = () => ({
  type: CREATE_CAMPAIGN_SUCCESS
});

export const createCampaignFailed = (error) => ({
  type: CREATE_CAMPAIGN_FAILED,
  payload: error
});

export const contribute = (address,value) => ({
  type: CONTRIBUTE,
  payload: {
    address,
    value
  }
});

export const contributeStart = () => ({
  type: CONTRIBUTE_START
});

export const contributeSuccess = () => ({
  type: CONTRIBUTE_SUCCESS
});

export const contributeFailed = (error) => ({
  type: CONTRIBUTE_FAILED,
  payload: error
});