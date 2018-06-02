import {takeLatest,put,call} from 'redux-saga/effects';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { CREATE_CAMPAIGN } from '../../actions/types';
import {
  fetchCampaignsSuccess,
  createCampaignFailed,
  createCampaignStart,
  createCampaignSuccess
} from '../../actions';

export function* createCampaignSaga() {
  yield takeLatest(CREATE_CAMPAIGN, function* ({payload: {minimumContribution,cb}}) {
    try {
      yield put(createCampaignStart());
      const accounts = yield call(web3.eth.getAccounts);
      yield call(factory.methods
        .createCampaign(minimumContribution)
        .send,{from: accounts[0]});
      const campaigns = yield call(factory.methods.getDeployedCampaigns().call);
      yield put(createCampaignSuccess());
      yield call(cb);
      yield put(fetchCampaignsSuccess(campaigns));
    }
    catch(error) {
      yield put(createCampaignFailed('Transaction error'));
    }
  })
}