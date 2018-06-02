import {put,takeLatest,call} from 'redux-saga/effects';
import web3 from '../../ethereum/web3';
import Campaign from '../../ethereum/campaign';
import {CONTRIBUTE} from '../../actions/types';
import {
  contributeStart,
  contributeSuccess,
  contributeFailed
} from '../../actions';

import {getSummary} from './getSummary';

export function* contributeSaga() {
  yield takeLatest(CONTRIBUTE,function* ({payload: {address,value}}) {
    try {
      yield put(contributeStart());
      const accounts = yield call(web3.eth.getAccounts);
      const campaign = Campaign(address);
      yield call(
        campaign.methods.contribute().send,
        {
          from: accounts[0],
          value: web3.utils.toWei(value,'ether')
        }
      );
      yield put(contributeSuccess());
      yield call(getSummary,campaign);
    }
    catch(error) {
      yield put(contributeFailed(error.message));
    }
  })
}