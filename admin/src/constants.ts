import type { Role, Stage } from './types';
export const ROLES: Role[] = ['Customer Support','Sales','IT Support','Engineering','Admissions Officer','Communications Officer'];
export const STAGES: Stage[] = ['New','Screening','Interview','Offer Sent','Placed','Rejected','Withdrawn','On Hold'];
export const MAIN_STAGES: Stage[] = ['New','Screening','Interview','Offer Sent','Placed'];
export const LANGS = ['EN','FR','AR','ES'];
export const ROLE_ICONS: Record<string,string> = {'Customer Support':'🎧','Sales':'💼','IT Support':'🖥','Engineering':'⚙️','Admissions Officer':'🎓','Communications Officer':'📢'};
export const ROLE_COLORS: Record<string,[string,string]> = {'Customer Support':['#C8A84B','#FEF9EC'],Sales:['#185FA5','#EBF4FF'],'IT Support':['#6D28D9','#F5F3FF'],Engineering:['#2E7D32','#F0FFF4'],'Admissions Officer':['#B91C1C','#FFF5F5'],'Communications Officer':['#B45309','#FFFBEB']};
export const STAGE_COLORS: Record<string,[string,string]> = {New:['#888','#F5F5F5'],Screening:['#185FA5','#EBF4FF'],Interview:['#B45309','#FFFBEB'],'Offer Sent':['#6D28D9','#F5F3FF'],Placed:['#2E7D32','#F0FFF4'],Rejected:['#B91C1C','#FEE2E2'],Withdrawn:['#777','#F1F1F1'],'On Hold':['#B45309','#FEF3C7']};
