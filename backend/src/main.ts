import { NestFactory } from '@nestjs/core'
import helmet from 'helmet'

import { AppModule } from './app.module'
import { AllExceptionsFilter } from './common/filters/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['error', 'warn']
  })
  app.useGlobalFilters(new AllExceptionsFilter())
  app.use(helmet())
  await app.listen(process.env.PORT || 3010)
}

bootstrap()
