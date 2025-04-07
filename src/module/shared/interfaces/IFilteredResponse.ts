export interface IFilteredResponse<T> {
    [key: string]: T[] | number;
    total: number;
    page: number;
    pages: number;
}
