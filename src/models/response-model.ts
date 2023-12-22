export interface IResponseModel<T> {
    loading: boolean;
    data: T;
    error: string;

}