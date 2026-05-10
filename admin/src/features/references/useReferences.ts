import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {referenceActions} from './referenceSlice';

export function useReferences() {
    const dispatch = useAppDispatch();
    const state = useAppSelector(store => store.references);
    return {
        ...state,
        fetchReferences: () => dispatch(referenceActions.fetchReferenceDataRequest()),
    };
}
