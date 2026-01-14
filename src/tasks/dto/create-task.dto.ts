import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsMongoId } from 'class-validator';
import { TaskStatus } from '@prisma/client'; 

export class CreateTaskDto {
  @ApiProperty({ example: 'Do code review' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ enum: TaskStatus, default: TaskStatus.NEW })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional({ description: 'Project ID (optional)', example: '65f2a...' })
  @IsOptional()
  @IsMongoId({ message: 'Invalid project ID' })
  projectId?: string;
}