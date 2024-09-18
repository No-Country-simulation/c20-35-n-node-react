import { Injectable } from '@nestjs/common'
import { Activity } from './entities/activity.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}
  findAll() {
    return this.activityRepository.find()
  }
}
