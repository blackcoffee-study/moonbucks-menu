export class APIResult<T> {
  constructor(public ok: boolean, public data?: T, public message?: string) {}
}
