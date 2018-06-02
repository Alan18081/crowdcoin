import {call,put,takeLatest} from 'redux-saga/effects';
import getCampaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import {FINALIZE_REQUEST} from '../../actions/types';
import {
  fetchRequests,
  finalizeRequestFailed
} from '../../actions';

export function* finalizeRequestSaga() {
  yield takeLatest(FINALIZE_REQUEST,function* ({payload: {address,id}}) {
    try {
      const campaign = getCampaign(address);
      const accounts = yield call(web3.eth.getAccounts);
      yield call(campaign.methods.finalizeRequest(id).send,{
        from: accounts[0]
      });
      yield put(fetchRequests(address));
    }
    catch(error) {
      yield put(finalizeRequestFailed(error.message));
    }
  });
}