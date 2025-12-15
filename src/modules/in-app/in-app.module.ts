import { Module } from '@nestjs/common';
import { InAppService } from './in-app.service';
import { InAppController } from './in-app.controller';

@Module({
  providers: [InAppService],
  controllers: [InAppController]
})
export class InAppModule {}
