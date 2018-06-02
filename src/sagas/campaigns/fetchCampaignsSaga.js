import {take,put,call} from 'redux-saga/effects';
import factory from '../../ethereum/factory';
import {
  FETCH_CAMPAIGNS
} from '../../actions/types';
import {
  fetchCampaignsSuccess
} from '../../actions/campaigns';

export function* fetchCampaignsSaga() {
  try {
    yield take(FETCH_CAMPAIGNS);
    const campaigns = yield call(factory.methods.getDeployedCampaigns().call);
    yield put(fetchCampaignsSuccess(campaigns));
  }
  catch(error) {
    console.log(error);
  }
}