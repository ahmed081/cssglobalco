import { all, select, takeEvery } from 'redux-saga/effects';
import { actions } from './recruitSlice';
function* persist(): Generator<any, void, any>{ const state: ReturnType<any> = yield select((s)=>s.recruit); localStorage.setItem('cg_cands_v2', JSON.stringify(state.candidates)); localStorage.setItem('cg_jobs_v2', JSON.stringify(state.jobs)); }
export default function* rootSaga(): Generator<any, void, any>{ yield all([takeEvery([actions.addCandidate.type,actions.updateCandidate.type,actions.deleteCandidate.type,actions.setStage.type,actions.addJob.type,actions.updateJob.type,actions.deleteJob.type,actions.bulkStage.type,actions.resetDemoData.type], persist)]); }
