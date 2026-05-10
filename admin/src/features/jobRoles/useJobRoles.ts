import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {jobRoleActions} from './jobRoleSlice';
import type {JobRole, JobRoleSearchParams} from './jobRoleTypes';

export function useJobRoles() {
    const dispatch = useAppDispatch();
    const state = useAppSelector(store => store.jobRoles);
    return {
        roles: state.items,
        selectedRole: state.selectedRole,
        loading: state.loading,
        error: state.error,
        fetchRoles: (params?: JobRoleSearchParams) => dispatch(jobRoleActions.fetchJobRolesRequest(params)),
        createRole: (role: JobRole) => dispatch(jobRoleActions.createJobRoleRequest(role)),
        updateRole: (role: JobRole) => dispatch(jobRoleActions.updateJobRoleRequest(role)),
        deleteRole: (id: string) => dispatch(jobRoleActions.deleteJobRoleRequest(id)),
        closeRole: (id: string) => dispatch(jobRoleActions.closeJobRoleRequest(id)),
        reopenRole: (id: string) => dispatch(jobRoleActions.reopenJobRoleRequest(id)),
    };
}
