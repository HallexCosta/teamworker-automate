import { HttpClient } from './http-client'

describe('Fetch', () => {
  describe('#handler', () => {
    let httpClient: HttpClient
    beforeEach(() => {
      httpClient = new HttpClient({
        baseURL: 'https://localhost',
        defaultHeaders: {
          authorization: 'Basic test',
        },
      })
    })
    it('should be fill baseURL with empty string', () => {
      const httpClient = new HttpClient({
        defaultHeaders: {
          authorization: 'Basic test',
        },
      })

      expect(httpClient.props.baseURL).toBe('')
    })
    it('should be fill defaultHeaders with empty object', () => {
      const httpClient = new HttpClient({
        baseURL: 'http://localhost',
      })

      expect(httpClient.props.defaultHeaders).toMatchObject({})
    })
    it('should be fill baseURL with empty string and defaultHeaders with empty object', () => {
      const httpClient = new HttpClient()

      expect(httpClient.props.baseURL).toBe('')
      expect(httpClient.props.defaultHeaders).toMatchObject({})
    })
    it('should be calling httpClient.handler with {METHOD} and {ENDPOINT} with the bar "/"', async () => {
      const fetchSpy = jest.spyOn(global, 'fetch')

      await httpClient.handler('GET', '/test')

      expect(fetchSpy).toBeCalledWith('https://localhost/test', {
        headers: { authorization: 'Basic test' },
        method: 'GET',
      })
    })
    it('should be calling httpClient.handler with {METHOD} and {ENDPOINT} without the bar "/"', async () => {
      const fetchSpy = jest.spyOn(global, 'fetch')

      await httpClient.handler('GET', 'test')

      expect(fetchSpy).toBeCalledWith('https://localhost/test', {
        headers: { authorization: 'Basic test' },
        method: 'GET',
      })
    })
    it('should be add options.headers on call httpClient.handler', async () => {
      const fetchSpy = jest.spyOn(global, 'fetch')

      await httpClient.handler('GET', 'test', null, {
        headers: {
          authorization: 'Bearer test',
        },
      })

      expect(fetchSpy).toBeCalledWith('https://localhost/test', {
        headers: { authorization: 'Bearer test' },
        method: 'GET',
      })
    })
    it('should be calling RequestFetch.handler return data response with ok like true, data serialized and headers serialized', async () => {
      const responseMocked = {
        ok: true,
        data: {
          name: 'hallexcosta',
        },
        headers: {},
      }
      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: async () => ({ name: 'hallexcosta' }),
        headers: {},
      } as Response)
      const response = await httpClient.handler('GET', '/test')
      expect(response).toMatchObject(responseMocked)
    })
  })
  describe('#get', () => {
    let httpClient: HttpClient
    beforeEach(() => {
      httpClient = new HttpClient({
        baseURL: 'https://localhost',
        defaultHeaders: {
          authorization: 'Basic test',
        },
      })
    })
    it('should be handle request using httpClient.get', async () => {
      const handlerSpy = jest.spyOn(httpClient, 'handler')
      const options = {
        headers: {
          authorization: 'Basic 123',
        },
      }
      const endpoint = 'https://localhost/test'
      await httpClient.get(endpoint, options)

      const body = null
      const method = 'GET'
      const args = [method, endpoint, body, options]
      expect(handlerSpy).toHaveBeenCalledWith(...args)
    })
  })
})
