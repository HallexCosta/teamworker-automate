import { RequestFetch } from './request-fetch'

describe('Fetch', () => {
  describe('#handler', () => {
    let requestFetch: RequestFetch
    beforeEach(() => {
      requestFetch = new RequestFetch({
        baseURL: 'https://localhost',
        defaultHeaders: {
          authorization: 'Basic test',
        },
      })
    })
    it('should be fill baseURL with empty string ', () => {
      requestFetch = new RequestFetch()
      expect(requestFetch.props.defaultHeaders).toBe({})
    })
    it('should be fill defaultHeaders with empty object', () => {
      requestFetch = new RequestFetch({
        defaultHeaders: {
          authorization: 'Basic test',
        },
      })

      expect(requestFetch.props.baseURL).toBe('')
    })
    it('should be calling RequestFetch.handler with {METHOD} and {ENDPOINT} with the bar "/"', async () => {
      const fetchSpy = jest.spyOn(global, 'fetch')

      await requestFetch.handler('GET', '/test')

      expect(fetchSpy).toBeCalledWith('https://localhost/test', {
        headers: { authorization: 'Basic test' },
        method: 'GET',
      })
    })
    it('should be calling RequestFetch.handler with {METHOD} and {ENDPOINT} without the bar "/"', async () => {
      const fetchSpy = jest.spyOn(global, 'fetch')

      await requestFetch.handler('GET', 'test')

      expect(fetchSpy).toBeCalledWith('https://localhost/test', {
        headers: { authorization: 'Basic test' },
        method: 'GET',
      })
    })
    it('should be add options.headers on call RequestFetch.handler', async () => {
      const fetchSpy = jest.spyOn(global, 'fetch')

      await requestFetch.handler('GET', 'test', null, {
        headers: {
          authorization: 'Bearer test',
        },
      })

      expect(fetchSpy).toBeCalledWith('https://localhost/test', {
        headers: { authorization: 'Bearer test' },
        method: 'GET',
      })
    })
    // it('should be add parse headers in object to native Headers of javascript', async () => {
    //   const handleHeadersSpy = jest.spyOn(requestFetch, 'handleHeaders')

    //   const headers = requestFetch.handleHeaders({
    //     authorization: 'Basic test',
    //   })

    //   expect(handleHeadersSpy).toBeCalledWith({
    //     authorization: 'Bearer test',
    //   })
    //   expect(headers).toBeMa
    // })
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
      const response = await requestFetch.handler('GET', '/test')
      expect(response).toMatchObject(responseMocked)
    })
  })
  describe('#get')
})
