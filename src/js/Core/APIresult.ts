export class APIResult<T> {
  constructor(
    public ok: boolean,
    public data: T | undefined,
    public message: string | undefined
  ) {}
}
