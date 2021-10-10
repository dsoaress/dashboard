import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { FileModule } from './file/file.module'
import { ProjectModule } from './project/project.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [UserModule, ProjectModule, FileModule],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
