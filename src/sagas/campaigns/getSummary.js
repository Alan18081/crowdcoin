import {put,call} from 'redux-saga/effects';
import {
  fetchActiveCampaignSuccess
} from '../../actions';

export function* getSummary(campaign) {
  const summary = yield call(campaign.methods.getSummary().call);
  const info = {
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4]
  };
  yield put(fetchActiveCampaignSuccess(info));
}