import {takeEvery,call} from 'redux-saga/effects';
import Campaign from '../../ethereum/campaign';
import {FETCH_ACTIVE_CAMPAIGN} from '../../actions/types';
import {getSummary} from './getSummary';

export function* fetchActiveCampaignSaga() {
  yield takeEvery(FETCH_ACTIVE_CAMPAIGN,function* ({payload}) {
    try {
      const campaign = Campaign(payload);
      yield call(getSummary,campaign);
    }
    catch(error) {

    }
  });
}