export interface HttpClient {
  get<T = {}>(): Promise<T>
}
