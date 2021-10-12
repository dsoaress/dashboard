import { CacheInterceptor, CacheModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import * as redisStore from 'cache-manager-redis-store'
import { ConnectionString } from 'connection-string'

import { AppController } from './app.controller'
import { JwtAuthGuard } from './common/guards/jwt-auth.guard'
import { RolesGuard } from './common/guards/roles.guard'
import { FileModule } from './file/file.module'
import { MeModule } from './me/me.module'
import { ProjectModule } from './project/project.module'
import { SessionModule } from './session/session.module'
import { UserModule } from './user/user.module'

const redis = new ConnectionString(process.env.REDIS_URL)

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: redis.hostname,
      auth_pass: redis.password,
      port: redis.port,
      ttl: 60 * 60 * 24 // 1 day
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100
    }),
    UserModule,
    ProjectModule,
    FileModule,
    SessionModule,
    MeModule
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor }
  ]
})
export class AppModule {}
