interface HttpClientProps {
  baseURL?: string
  defaultHeaders?: {
    authorization?: string
  }
}

interface HttpClientResponseError {
  message: string
}

interface HttpClientRequestOptions {
  headers?: {
    authorization?: string
    [k: string]: string
  }
}

interface HttpClientResponseGeneric<HttpClientResponseType> {
  ok: boolean
  headers?: Headers
  data: HttpClientResponseType | HttpClientResponseError
}

export class HttpClient {
  constructor(public readonly props?: HttpClientProps) {
    if (!props)
      this.props = {
        baseURL: '',
        defaultHeaders: {},
      }
    if (props && !props.baseURL) this.props.baseURL = ''
    if (props && !props.defaultHeaders) this.props.defaultHeaders = {}
  }

  // post() {}

  async get<HttpClientResponseType = any>(
    endpoint: string,
    options?: HttpClientRequestOptions,
  ) {
    return await this.handler<HttpClientResponseType>(
      'GET',
      endpoint,
      null,
      options,
    )
  }

  async handler<HttpClientResponseType = {}>(
    method: string,
    endpoint: string,
    body: HttpClientResponseType = null,
    options?: HttpClientRequestOptions,
  ): Promise<HttpClientResponseGeneric<HttpClientResponseType>> {
    try {
      endpoint = endpoint.startsWith('/')
        ? `${this.props.baseURL}${endpoint}`
        : `${this.props.baseURL}/${endpoint}`

      let headers = {}
      Object.assign(headers, { ...this.props.defaultHeaders })
      options && options.hasOwnProperty('headers')
        ? Object.assign(headers, { ...options.headers })
        : null

      const response = await fetch(endpoint, {
        method,
        headers,
      })

      return {
        ok: true,
        headers: response.headers,
        data: await response.json(),
      }
    } catch (e) {
      return {
        ok: false,
        data: {
          message: e.message,
        },
      }
    }
  }
}
