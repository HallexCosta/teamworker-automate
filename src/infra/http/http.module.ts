import { Module } from '@nestjs/common'
import { HomeController } from './server/rest/nest/home.controller'
import { RestModule } from './server/rest/rest.module'
import { HttpClient } from './client/fetch/http-client'

@Module({
  imports: [RestModule],
  controllers: [HomeController],
  providers: [HttpClient],
})
export class HttpModule {}
