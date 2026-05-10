import {useMemo, useState} from 'react';

export function usePagination(totalItems: number, initialPageSize = 20) {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    return useMemo(() => ({page, pageSize, totalPages, setPage, setPageSize}), [page, pageSize, totalPages]);
}
