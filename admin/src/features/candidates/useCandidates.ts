import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {candidateActions} from './candidateSlice';
import type {Candidate, CandidateSearchParams, EntityId, Stage} from './candidateTypes';

export function useCandidates() {
    const dispatch = useAppDispatch();
    const state = useAppSelector(store => store.candidates);
    return {
        candidates: state.items,
        selectedCandidate: state.selectedCandidate,
        loading: state.loading,
        error: state.error,
        filters: state.filters,
        fetchCandidates: (params?: CandidateSearchParams) => dispatch(candidateActions.fetchCandidatesRequest(params)),
        searchCandidates: (params: CandidateSearchParams) => dispatch(candidateActions.searchCandidatesRequest(params)),
        fetchCandidateById: (id: EntityId) => dispatch(candidateActions.fetchCandidateByIdRequest(id)),
        createCandidate: (candidate: Candidate) => dispatch(candidateActions.createCandidateRequest(candidate)),
        updateCandidate: (candidate: Candidate) => dispatch(candidateActions.updateCandidateRequest(candidate)),
        deleteCandidate: (id: EntityId) => dispatch(candidateActions.deleteCandidateRequest(id)),
        changeStage: (id: EntityId, stage: Stage, note?: string) => dispatch(candidateActions.changeCandidateStageRequest({
            id,
            stage,
            note
        })),
    };
}
