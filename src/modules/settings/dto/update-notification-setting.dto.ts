import { PartialType } from '@nestjs/swagger';
import { CreateSettingDto } from './create-notification-setting.dto';

export class UpdateSettingDto extends PartialType(CreateSettingDto) {}
