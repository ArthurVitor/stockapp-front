export default interface IPaginationProps {
    totalRecords: number;
    pageSize: number;
    onPageChange: (skip: number) => void;
    currentSkip: number;
}