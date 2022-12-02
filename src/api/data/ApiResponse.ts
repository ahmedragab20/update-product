export default interface ApiResponse<T> {
  data: T;
  succeeded: boolean;
  message: string;
  brokenRules: Array<string>;
  statusCode: number;
}
