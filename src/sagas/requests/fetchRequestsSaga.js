import {call,put,takeEvery} from 'redux-saga/effects';
import Campaign from '../../ethereum/campaign';
import {FETCH_REQUESTS} from '../../actions/types';
import {fetchRequestsSuccess} from '../../actions';

export function* fetchRequestsSaga() {
  yield takeEvery(FETCH_REQUESTS,function* ({payload}) {
    try {
      const campaign = Campaign(payload);
      const requestCount = yield call(campaign.methods.getRequestsCount().call);
      const requests = yield Promise.all(
        Array(requestCount).fill().map((item,index) => {
          return campaign.methods.requests(index).call();
        })
      );
      const approversCount = yield call(campaign.methods.approversCount().call);
      yield put(fetchRequestsSuccess(requests,approversCount));
    }
    catch (error) {

    }
  })
}