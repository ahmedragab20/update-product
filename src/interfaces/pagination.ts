export interface Pagination {
    pageNumber: number,
    totalPages: number,
    totalCount: number,
    pageSize: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean,
}