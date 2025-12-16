import { Module } from '@nestjs/common';
import { NunjucksProvider } from './nunjucks.provider';

@Module({
  providers: [NunjucksProvider],
  exports: [NunjucksProvider],
})
export class NunjucksModule {}
