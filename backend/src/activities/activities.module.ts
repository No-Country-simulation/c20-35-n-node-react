import { Module } from '@nestjs/common'
import { ActivitiesService } from './activities.service'
import { ActivitiesController } from './activities.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Activity } from './entities/activity.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Activity])],
  providers: [ActivitiesService],
  controllers: [ActivitiesController],
})
export class ActivitiesModule {}
