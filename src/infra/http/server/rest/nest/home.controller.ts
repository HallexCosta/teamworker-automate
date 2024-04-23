import { Controller, Get } from '@nestjs/common'
import { HttpClient } from 'src/infra/http/client/fetch/http-client'

@Controller()
export class HomeController {
  public constructor(private httpClient: HttpClient) {}

  @Get('/')
  async list() {
    // return this.listUserDomain.listUsers();
    const httpClient = new HttpClient({
      baseURL: 'https://api.waifu.pics',
    })
    const response = await httpClient.get<{ url: string }>('/sfw/waifu')
    return {
      message: 'Successfully calling API in Nest.js',
      data: response.data,
    }
  }
}
