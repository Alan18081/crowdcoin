import {call,put,takeLatest} from 'redux-saga/effects';
import getCampaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import {APPROVE_REQUEST} from '../../actions/types';
import {
  approveRequestFailed,
  fetchRequests
} from '../../actions';

export function* approveRequestSaga() {
  yield takeLatest(APPROVE_REQUEST,function*({payload: {address,id,cb}}) {
    try {
      console.log('Hey');
      const campaign = getCampaign(address);
      const accounts = yield call(web3.eth.getAccounts);
      yield call(campaign.methods.approveRequest(id).send,{
        from: accounts[0]
      });
      yield call(cb);
      yield put(fetchRequests(address));
    }
    catch(error) {
      console.log(error);
      yield put(approveRequestFailed(error.message));
    }
  });
}