import { Module } from '@nestjs/common'
import { ListUserDomain } from './application/services/list-user-domain'

import { HttpModule } from './infra/http/http.module'
import { HomeController } from './infra/http/server/rest/nest/home.controller'
import { HttpClient } from './infra/http/client/fetch/http-client'
import { RestModule } from './infra/http/server/rest/rest.module'

@Module({
  imports: [HttpModule, RestModule], // when import modules
  controllers: [HomeController], // when import controllers
  providers: [ListUserDomain, HttpClient], // when import services/use-cases (content bussiness-rules) or external providers like payment sdk, email, etc...
})
export class AppModule {}
