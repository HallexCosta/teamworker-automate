import { Module } from '@nestjs/common'
import { HomeController } from './nest/home.controller'
import { HttpClient } from '../../client/fetch/http-client'
// import { TeamworkTaskCompleted } from 'src/application/services/teamworker-task-completed';

@Module({
  controllers: [HomeController],
  providers: [HttpClient],
})
export class RestModule {}
