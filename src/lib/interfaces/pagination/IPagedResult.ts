export default interface IPagedResult<T> {
    totalRecords: number;
    records: T[];
}