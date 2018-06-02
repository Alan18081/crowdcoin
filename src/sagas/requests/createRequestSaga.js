import {call,put,takeLatest} from 'redux-saga/effects';
import getCampaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import {CREATE_REQUEST} from '../../actions/types';
import {
  createRequestSuccess,
  createRequestStart,
  createRequestFailed,
  fetchRequests
} from '../../actions';

export function* createRequestSaga() {
  yield takeLatest(CREATE_REQUEST,function* ({payload: {address,info,cb}}) {
    try {
      yield put(createRequestStart());
      const campaign = getCampaign(address);
      const {value,description,recipient} = info;
      const accounts = yield call(web3.eth.getAccounts);
      yield call(
        campaign.methods.createRequest(
          description,
          web3.utils.toWei(value,'ether'),
          recipient
        ).send,
        {
          from: accounts[0]
        }
      );
      yield put(createRequestSuccess());
      yield put(cb);
      yield put(fetchRequests(address));
    }
    catch(error) {
      yield put(createRequestFailed(error.message));
    }
  });
}