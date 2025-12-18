import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { SettingService } from './setting.service';
import { CreateSettingDto } from './dto/create-notification-setting.dto';
import { UpdateSettingDto } from './dto/update-notification-setting.dto';
import { UserIdHeader } from 'src/common/constants';

@Controller('settings')
export class SettingController {
  constructor(private readonly service: SettingService) {}

  @Post()
  create(@Body() createSettingDto: CreateSettingDto) {
    return this.service.create(createSettingDto);
  }

  @Get()
  findAll(@Headers(UserIdHeader) userId: string) {
    return this.service.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSettingDto: UpdateSettingDto) {
    return this.service.update(id, updateSettingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
