import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UserIdDto {
  @ApiProperty({
    example: 'asdf-sdff-ggds-rrer',
  })
  @IsUUID()
  @IsNotEmpty()
  user_id: string;
}
