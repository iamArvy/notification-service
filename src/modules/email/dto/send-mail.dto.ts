import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EmailTemplates } from 'src/common/enum';

export class EmailParticipantDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  name?: string;
}

export class EmailPayloadDto {
  @ApiPropertyOptional({ type: EmailParticipantDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => EmailParticipantDto)
  from?: EmailParticipantDto;

  @ApiProperty({ type: [EmailParticipantDto] })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => EmailParticipantDto)
  to: EmailParticipantDto[];

  @ApiProperty({ example: 'Welcome to Scriptly 🎉' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    enum: EmailTemplates,
    example: EmailTemplates.ACCOUNT_CREATED,
  })
  @IsEnum(EmailTemplates)
  templateNameID: EmailTemplates;

  @ApiProperty({
    example: { firstName: 'Seyi', verificationLink: 'https://...' },
  })
  @IsObject()
  @IsNotEmptyObject()
  templateData: Record<string, unknown>;

  @ApiPropertyOptional({
    description: 'Fallback plain text version of the email',
  })
  @IsOptional()
  @IsString()
  text?: string;
}
