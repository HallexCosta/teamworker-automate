class Teamworker {
  public constructor(private readonly apiKey: string) {}

  get headers() {
    return {
      Authorization: `Basic ${this.basicAuth}`,
    }
  }

  public get basicAuth() {
    const username = this.apiKey
    const auth = `${username}:`
    return Buffer.from(auth, 'base64').toString('base64')
  }
}
