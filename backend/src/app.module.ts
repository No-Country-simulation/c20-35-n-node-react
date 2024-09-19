import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { ActivitiesModule } from './activities/activities.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
      isGlobal: true, // Makes the ConfigModule globally available
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number.parseInt(<string>process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: process.env.MODE === 'development',
      logging: true,
      ssl: true,
    }),
    UsersModule,
    AuthModule,
    ActivitiesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
