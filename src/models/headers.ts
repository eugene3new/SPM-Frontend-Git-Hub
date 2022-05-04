export interface IHeaderPagination {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  previousPageLink: string | null;
  nextPageLink: string | null;
}
